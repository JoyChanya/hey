export default function NoResult({ onClear }: { onClear: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-4">
      <p className="text-gray-300">ไม่พบผลลัพธ์ ลองลดตัวกรอง หรือเปลี่ยนการค้นหา</p>
      <button
        onClick={onClear}
        className="text-sm text-[#F9C1C1] hover:underline"
      >
        ล้างตัวกรองทั้งหมด
      </button>
    </div>
  );
}