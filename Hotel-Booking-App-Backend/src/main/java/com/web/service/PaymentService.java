package com.web.service;

import com.stripe.exception.StripeException;
import com.web.model.Booking;
import com.web.response.PaymentResponse;

public interface PaymentService {

	public PaymentResponse createPaymentLink(Booking booking) throws StripeException;
}
