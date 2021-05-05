import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import { useContext, useEffect, useState } from 'react';

const HeaderCartButton = (props) => {
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
    const cartCtx = useContext(CartContext);

    //object destructuring
    const { items } = cartCtx;

    const numberOfCartItems = items.reduce(
        (curNumber, item) => {
            return curNumber + item.amount;
        }, 0
    );

    const btnClasses = 
        `${classes.button} ${btnIsHighlighted ? classes.bump : ' '}`;
        
    //used for handling sideffects 
    useEffect(
        () => {
            if (items.length === 0) {
                return;
            }
            setBtnIsHighlighted(true);

            const timer = setTimeout(() => {
                setBtnIsHighlighted(false);
            }, 300); //300 for bump animation see css file

            /* 
             * to make sure animation is triggered everytime button is pressed
             * timer is cleared  to allow newtimer to be set
             */
            return () => {
                clearTimeout(timer);
            };

        }, [items]
    ); 

    return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
    )
}

export default HeaderCartButton