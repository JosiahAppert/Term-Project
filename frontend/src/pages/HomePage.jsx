import ResetDBForm from "../components/ResetDBForm";

function HomePage({ backendURL }) {
    return (
        <>
            <h1>Home Page</h1>
            <div className="homepageDescription">
                <p>Developer information and Project overview here.</p>
            </div>
            <ResetDBForm backendURL={backendURL} />
        </>
    );
}

export default HomePage;