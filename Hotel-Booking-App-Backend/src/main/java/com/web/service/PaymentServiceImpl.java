package com.web.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.web.model.Booking;
import com.web.response.PaymentResponse;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class PaymentServiceImpl implements PaymentService{

	@Value("${stripe.api.key}")
	private String stripeSectetKey;
	
	@Override
	public PaymentResponse createPaymentLink(Booking booking) throws StripeException {
		
		Stripe.apiKey = stripeSectetKey;
		
		SessionCreateParams params = SessionCreateParams.builder().addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
				.setMode(SessionCreateParams.Mode.PAYMENT)
				.setSuccessUrl("http://localhost:5173/payment/success/"+ booking.getId())
				.setCancelUrl("http://localhost:5173/payment/fail")
				.addLineItem(SessionCreateParams.LineItem.builder()
						.setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder()
								.setCurrency("usd")
								.setUnitAmount( (long) (booking.getTotalPrice()*100))
								.setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder().setName("Ludia Food").build())
								.build()
								).build()
						).build();
		
		Session session = Session.create(params);
		
		PaymentResponse response = new PaymentResponse();
		response.setPayment_url(session.getUrl());
		return response;
	}

}
