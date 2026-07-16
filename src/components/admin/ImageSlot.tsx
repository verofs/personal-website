"use client";

/* eslint-disable @next/next/no-img-element */
import { DragEvent, useRef, useState } from "react";
import { adminFetch } from "./adminClient";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

interface ImageSlotProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  focus?: string;
  onFocusChange?: (focus: string) => void;
}

const DEFAULT_FOCUS = "50% 50%";

export default function ImageSlot({ label, value, onChange, focus, onFocusChange }: ImageSlotProps) {
  const [dragging, setDragging] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [adjusting, setAdjusting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLImageElement>(null);

  const activeFocus = focus && focus.trim() ? focus : DEFAULT_FOCUS;

  const setFocusFromEvent = (event: { clientX: number; clientY: number }) => {
    const el = previewRef.current;
    if (!el || !onFocusChange) return;
    const rect = el.getBoundingClientRect();
    const x = Math.round(Math.min(100, Math.max(0, ((event.clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.min(100, Math.max(0, ((event.clientY - rect.top) / rect.height) * 100)));
    onFocusChange(`${x}% ${y}%`);
  };

  const upload = async (file: File) => {
    if (!ACCEPTED.includes(file.type)) return setError("Use JPG, PNG, or WebP");
    if (file.size > MAX_BYTES) return setError("Must be under 5MB");
    setError("");
    setBusy(true);
    try {
      const form = new FormData();
      form.set("file", file);
      const response = await adminFetch("/api/admin/upload", { method: "POST", body: form });
      const data = (await response.json()) as { url: string };
      onChange(data.url);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Upload failed");
    } finally {
      setBusy(false);
    }
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) upload(file);
  };

  return (
    <div className="grid gap-2">
      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-white/45">{label}</div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => !(adjusting && value) && inputRef.current?.click()}
        onKeyDown={(event) =>
          !(adjusting && value) && (event.key === "Enter" || event.key === " ") && inputRef.current?.click()
        }
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`relative flex min-h-32 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed text-center transition ${
          adjusting && value ? "cursor-crosshair" : "cursor-pointer"
        } ${dragging ? "border-neon-pink bg-neon-pink/10" : "border-white/15 bg-black/25 hover:border-neon-cyan/50"}`}
      >
        {value ? (
          <>
            <img
              ref={previewRef}
              src={value}
              alt={label}
              draggable={false}
              onClick={(event) => {
                if (adjusting) {
                  event.stopPropagation();
                  setFocusFromEvent(event);
                }
              }}
              className="h-40 w-full object-cover"
              style={{ objectPosition: activeFocus }}
            />
            {adjusting && onFocusChange && (
              <span
                className="pointer-events-none absolute z-10 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-neon-pink/80 shadow-[0_0_0_2px_rgba(0,0,0,0.5)]"
                style={{ left: activeFocus.split(" ")[0], top: activeFocus.split(" ")[1] }}
              />
            )}
            <span className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-[11px] text-white/80">
              {busy
                ? "Uploading..."
                : adjusting
                  ? "Click the part to keep in view"
                  : "Drop or click to replace"}
            </span>
          </>
        ) : (
          <div className="px-4 py-8 text-xs text-white/45">
            {busy ? "Uploading..." : "Drag & drop an image here, or click to browse"}
          </div>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        {value && onFocusChange && (
          <button
            type="button"
            onClick={() => setAdjusting((current) => !current)}
            className={`text-xs font-medium ${adjusting ? "text-neon-cyan" : "text-white/60 hover:text-white/90"}`}
          >
            {adjusting ? "Done positioning" : "Adjust position"}
          </button>
        )}
        {value && onFocusChange && activeFocus !== DEFAULT_FOCUS && (
          <button
            type="button"
            onClick={() => onFocusChange(DEFAULT_FOCUS)}
            className="text-xs font-medium text-white/50 hover:text-white/80"
          >
            Center
          </button>
        )}
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-medium text-red-300 hover:text-red-200"
          >
            Remove photo
          </button>
        )}
        {error && <span className="text-xs text-red-300">{error}</span>}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => event.target.files?.[0] && upload(event.target.files[0])}
      />
    </div>
  );
}
