function ProgressCircle({ percentage }) {
  // -css class for ProgressCircle design
  let pc_curve;
  let pc_curve_half2;
  let percentageToUse = Math.round((percentage * 360) / 100);

  // -assign css class for designing ProgressCircle
  if (percentage < 50) {
    pc_curve = "pc_curve_less";
    pc_curve_half2 = "pc_curve_half2_less";
  } else {
    pc_curve = "pc_curve_greater";
    pc_curve_half2 = "pc_curve_half2_greater";
  }
  return (
    <div className="progress-circle relative w-12 h-12">
      <div className="flex justify-center items-center w-full h-full text-center text-white text-sm border-6 border-white border-opacity-20 rounded-full">
        {percentage}%
      </div>
      <div className={`${pc_curve} absolute top-0 left-0 w-full h-full`}>
        <div
          className={`pc_curve_half1 absolute w-full h-full border-6 border-white rounded-full`}
          style={{ transform: `rotate(${percentageToUse}deg)` }}
        ></div>
        <div
          className={`${pc_curve_half2} absolute w-full h-full border-6 border-white rounded-full transform`}
        ></div>
      </div>
    </div>
  );
}
export default ProgressCircle;
