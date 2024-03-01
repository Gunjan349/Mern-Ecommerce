import React from "react";

const ShippingPolicy = () => {
  return (
    <>
      <h1 className="flex justify-center my-10 font-bold tracking-wide text-2xl">
        Shipping Policy
      </h1>
      <p className="mx-10 text-lg">
        Thank you for visiting and shopping ships all of our orders via
        [USPS/UPS/FedEx/DHL]. <br/><br/>You will receive an email update with your
        tracking number once your order has shipped. Processing and Delivery
        Times All orders are processed within 5 days. Standard shipping typically takes between [2-8 business days],
        for destinations within the United States. If we are experiencing a high
        volume of orders, shipments may be delayed by a few days. Additionally,
        nationwide and global shipping delays (such as those caused by COVID-19,
        holiday volumes, or inclement weather) may impact your estimated
        delivery date. Tracking Your Order Once your order has shipped, you will
        receive an email with a tracking number to track your order via order Id.<br/><br/> Once you receive your tracking number,
        please allow up to 48 hours for the tracking portal to update. Customs
        Fees and Import Taxes nearYou is not responsible for any
        customs or import fees you may incur during or after shipping (tariffs,
        taxes, VAT, etc.).
      </p>
    </>
  );
};

export default ShippingPolicy;
