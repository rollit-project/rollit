const measurementData = [
  { label: '속도', value: '85.2 km/h' },
  { label: '중력가속도', value: '6.3 m/s²' },
  { label: '마찰력', value: '312.4 N' },
  { label: '총 소요 시간', value: '45.7 초' },
];

const Measurement = () => {
  return (
    <section className="flex justify-end p-5">
      <div className="h-[190px] w-[260px] rounded-xl bg-black/40 px-6 py-6 text-white">
        <ul>
          {measurementData.map(({ label, value }) => (
            <li key={label} className="mb-4 flex justify-between">
              <span className="text-right font-medium">{label}:</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Measurement;
