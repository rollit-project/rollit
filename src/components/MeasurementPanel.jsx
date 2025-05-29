// components/MeasurementPanel.jsx
const measurementData = [
  { name: '속도', measurement: '85.2 km/h' },
  { name: '중력가속도', measurement: '6.3 m/s²' },
  { name: '마찰력', measurement: '312.4 N' },
  { name: '총 소요 시간', measurement: '45.7 초' },
];

const Measurement = () => {
  return (
    <div className="flex justify-end p-5">
      <div className="w-[260px] h-[190px] bg-black/40 rounded-xl px-6 py-6 text-white">
        {measurementData.map(({ name, measurement }) => (
          <div key={name} className="flex justify-between mb-4">
            <div className="text-right font-medium">{name}:</div>
            <div>{measurement}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Measurement;
