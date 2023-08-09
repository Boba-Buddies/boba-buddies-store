function Checkout() {
  return (
    <>
      <div className="bg-slate-300 text-black p-8">
        <div className="bg-amber-800 text-4xl font-bold mb-4">
          I am the Logo
        </div>
        <form action="">
          <div>
            <h1>PAYMENT INFORMATION</h1>
          </div>
          <div>
            <input type="text" id="phone" placeholder="PHONE" />
          </div>
          <h1>DELIEVERY ADDRESS</h1>
          <div>
            <input
              type="text"
              name="firtName"
              id="firstName"
              placeholder="FIRST NAME"
            />
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="LAST NAME"
            />
          </div>
          <div>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="ADDRESS"
            />
          </div>
          <div>
            <input type="text" name="city" id="city" placeholder="CITY" />
          </div>
          <div>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="COUNTRY"
            />
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              placeholder="ZIPCODE"
            />
          </div>
          <div>
            <label htmlFor="payment">SELECT PAYMENT METHOD</label>
            <select name="payment" id="payment">
              <option value="card">CREDIT</option>
              <option value="visa">VISA</option>
            </select>
          </div>
          <div>
            <label htmlFor="shipping">SELECT SHIPPING METHOD</label>
            <select name="shipping" id="shipping">
              <option value="standard">Standard (3-7 working days)</option>
              <option value="express">Express (2-4 working days)</option>
              <option value="overnight">Overnight (1 working day)</option>
            </select>
          </div>
          <div>
            <h1>ORDER SUMMARY</h1>
            <div>
              <div>1 X ITEM NAME</div>
              <div>$1.00</div>
            </div>
            <div>
              <div>1 X ITEM NAMEs</div>
              <div>$1.00</div>
            </div>
            <div>
              <h1>SUBTOTAL</h1>
              <div>
                <p>NZD $2.00</p>
              </div>
            </div>
            <div>
              <h1>SHIPPING METHOD</h1>
            </div>
            <div>$7.00</div>
            <div>EXPRESS SHIPPING 1-2 DAYS</div>
            <div>
              <h1>ORDER TOTAL</h1>
              <p>NZD $9.00</p>
            </div>
          </div>
          <button>COMPLETE ORDER</button>
        </form>
      </div>
    </>
  )
}

export default Checkout
