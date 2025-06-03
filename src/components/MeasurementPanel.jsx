const measurementData = [
  { name: '속도', measurement: '85.2 km/h' },
  { name: '중력가속도', measurement: '6.3 m/s²' },
  { name: '마찰력', measurement: '312.4 N' },
  { name: '총 소요 시간', measurement: '45.7 초' },
];

const Measurement = () => {
  return (
    <section className="flex justify-end p-5">
      <div className="h-[190px] w-[260px] rounded-xl bg-black/40 px-6 py-6 text-white">
        <ul>
          {measurementData.map(({ name, measurement }) => (
            <li key={name} className="mb-4 flex justify-between">
              <span className="text-right font-medium">{name}:</span>
              <span>{measurement}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Measurement;
