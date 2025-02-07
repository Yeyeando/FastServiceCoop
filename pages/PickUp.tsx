import Footer from "../components/general/footer/Footer";
import Header from "../components/general/header/Header";


function PickUp(){
    return(
        <>
            <Header title="Pick up" showBackButton={false}/>
                <h1>No dishes ready</h1>
            <Footer/>
        </>
    )
    
}

export default PickUp;