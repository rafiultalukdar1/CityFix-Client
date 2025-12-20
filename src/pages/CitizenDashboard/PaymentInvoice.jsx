// PaymentInvoice.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: { padding: 30, fontSize: 12 },
    section: { marginBottom: 10 },
    title: { fontSize: 16, marginBottom: 10, fontWeight: 'bold' }
});

const PaymentInvoice = ({ payment }) => {
    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Invoice</Text>

                {payment ? (
                    <View style={styles.section}>
                        <Text>User: {payment.userEmail}</Text>
                        <Text>Payment Type: {payment.type}</Text>
                        <Text>Amount: {(payment.amount * 127.15).toFixed(1)}</Text>
                        <Text>Status: {payment.payment_status}</Text>
                        <Text>Date: {new Date(payment.paidAt).toLocaleDateString()}</Text>
                        <Text>Transaction ID: {payment.transactionId}</Text>
                    </View>
                ) : (
                    <View style={styles.section}>
                        <Text>No payment data available</Text>
                    </View>
                )}

                <View style={styles.section}>
                    <Text>Thank you for your payment!</Text>
                </View>
            </Page>
        </Document>
    );
};

export default PaymentInvoice;
