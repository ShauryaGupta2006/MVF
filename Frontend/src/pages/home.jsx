function home(){
    async function getMovies(){
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/test`);
        const data = await res.json();

        if (data.success) {
            console.log(data.data);
        }
    }
    
    useEffect(() => {
        getMovies();
    }, [])

    return(
        <div className="home">
            <img src="" alt="" />
            <h1>Title</h1>
            <button>Know More</button>
        </div>
    )
}

export default home