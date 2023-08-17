function PaymentMethod() {
  return (
    <div>
      <label htmlFor="payment" className="font-medium">
        SELECT PAYMENT METHOD
      </label>
      <select name="payment" id="payment" className="border p-2 w-full mb-4">
        <option value="card">CREDIT</option>
        <option value="visa">VISA</option>
      </select>
    </div>
  )
}

export default PaymentMethod
