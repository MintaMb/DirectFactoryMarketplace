import { SpinnerDotted } from 'spinners-react';
function Spinner() {
  return (
    <>
      <div className="sweet-loading spinner_dashboard">
        <SpinnerDotted size={50} thickness={100} speed={100} color="rgba(83, 2, 255, 1)" />

      </div>
    </>
  )
}

export default Spinner
