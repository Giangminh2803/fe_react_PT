import PropagateLoader from "react-spinners/PropagateLoader";

const Loading = () => {
    const style = {position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)"};
    return(
        <div style={style}><PropagateLoader color="#041d1f" /></div>
    )
}

export default Loading;