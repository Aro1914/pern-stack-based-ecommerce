import homecss from "../css/home.module.css";
import { useDispatch,useSelector } from "react-redux";
import { useEffect,useState} from "react";
import api from '../Api'
import { setProducts } from "../redux/reducers/productsReducer";
import Product from "./Product";
import {Link} from "react-router-dom";
import Navbar from './Navbar.js'

const Home = () =>{
    const products = useSelector((state)=>state.products.value);
    const dispatch = useDispatch();
    const [loadingState, setLoadingState] = useState("loading")
    
    const fetchProducts = async () =>{
        api.getApi('https://fakestoreapi.com/products')
        .then(response=>response.json())
        .then(result=>{          
            dispatch(setProducts(result))
            setLoadingState("ready")
        })
        .catch(err=>{
            setLoadingState("error");
        })
    }

    useEffect(()=>{
        if(products.length === 0){
            fetchProducts();
        }
        else{
            setLoadingState("ready")
        }
    },[]);
    

    return(
        <div>
            <Navbar />
            <div className={`${homecss.product_div} col-12`}>
                {loadingState==="loading" ?
                    (<h2>Loading Products</h2>) :
                loadingState==="error" ?
                    (<h2>Error loading products</h2>) :
                    (products.map((product)=>(
                                <Link to={`/product/${product.id}`} key={product.id}>
                                    <div className={`${homecss.product_parent} col-lg-3 col-md-3 col-sm-4 col-xs-12`}>
                                        <Product productProperties={product} css={homecss} buttonObject={{click:()=>{window.location.href="/product/" + product.id},text:"View Details"}}/>                                       
                                    </div>
                                </Link>
                            )
                        )
                    )   
                }
            </div>
        </div>
    )
}

export default Home;