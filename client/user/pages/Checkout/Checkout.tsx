function Checkout() {
  return (
    <>
      <div>
        <div>I am the Logo</div>
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
        </form>
      </div>
    </>
  )
}

export default Checkout
