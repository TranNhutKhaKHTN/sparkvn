export default function Logo({ className = "h-5 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className} role="img" aria-label="Cờ Việt Nam">
      <rect width="30" height="20" fill="#da251d" />
      <polygon
        fill="#ffff00"
        points="15,4 16.347,8.146 20.707,8.146 17.18,10.708 18.527,14.854 15,12.292 11.473,14.854 12.82,10.708 9.293,8.146 13.653,8.146"
      />
    </svg>
  );
}
