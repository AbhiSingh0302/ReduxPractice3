import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect, useState } from "react";

let isFirst = true;

function App() {
  const showCart = useSelector((state) => state.ui.showCart);

  const cart = useSelector((state) => state.cart.cartItems);

  const [isSending, setIsSending] = useState(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    if (isFirst) {
      isFirst = false;
      return;
    }
    setContent(["Sending...", "Sending cart data!", "blue"]);
    setIsSending(true);
    fetch("https://redux-cart-5f9d2-default-rtdb.firebaseio.com/cart.json", {
      method: "PUT",
      body: JSON.stringify(cart),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          res.json().then((data) => {
            console.log(data);
            throw new Error("Error!");
          });
        }
      })
      .then((data) => {
        console.log(data);
        setContent(["Succes!", "Sent cart data successfull!", "green"]);
        setTimeout(() => {
          setIsSending(false);
        }, 1000);
      })
      .catch((error) => {
        console.log(error.message);
        setContent(["Error!", "Sending cart data failed!", "red"]);
        setTimeout(() => {
          setIsSending(false);
        }, 1000);
      });
  }, [cart]);
  return (
    <>
      {isSending && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0.5rem 2rem",
            color: "white",
            backgroundColor: content[2],
          }}
        >
          <div>{content[0]}</div>
          <div>{content[1]}</div>
        </div>
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
