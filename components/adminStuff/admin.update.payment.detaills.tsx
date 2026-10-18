import { useEffect, useState } from "react";
import {
    getPaymentDetails,
    addPaymentDetails,
    deleteAllPaymentDetails,
    deletePaymentDetailsbyId,
    updatePaymentDetails,
} from "../../serverFunc/payment.details.crud";

type Payment = {
    _id: string;
    applicantName: string;
    mobile: string;
    paymentStatus: string;
    paymentDues: string;
};

const AdminUpdatePaymentDetaills = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    const fetchPayments = async () => {
        try {
            const data = await getPaymentDetails();
            setPayments(data as Payment[]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchPayments();
    }, []);

    const addPayment = async (formData: FormData) => {
        const paymentStatus = String(formData.get("paymentStatus") ?? "").trim();
        const paymentDues = String(formData.get("paymentDues") ?? "").trim();
        const mobile = String(formData.get("mobile") ?? "").trim();
        if (!paymentStatus || !paymentDues || !mobile) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            setAdding(true);
            const result = await addPaymentDetails({
                data: {
                    mobile,
                    paymentStatus,
                    paymentDues,
                },
            });

            alert(result.message);

            if (result.success) {
                await fetchPayments();
                (document.getElementById("add-payment-form") as HTMLFormElement)?.reset();
            }
        } catch (error) {
            console.error(error);
            alert("Failed to add payment.");
        } finally {
            setAdding(false);
        }
    };

    const updatePayment = async (payment: Payment) => {
        try {
            const result = await updatePaymentDetails({
                data: {
                    mobile: payment.mobile,
                    paymentStatus: payment.paymentStatus,
                    paymentDues: payment.paymentDues,
                },
            });

            alert(result.message);
        } catch (error) {
            console.error(error);
            alert("Failed to update payment.");
        }
    };

    const deletePayment = async (payment: Payment) => {
        if (!confirm(`Delete payment for ${payment.applicantName}?`)) return;

        try {
            const result = await deletePaymentDetailsbyId({
                data: {
                    mobile: payment.mobile,
                },
            });

            if (result.success) {
                setPayments((prev) =>
                    prev.filter((item) => item.mobile !== payment.mobile)
                );
            }

            alert(result.message);
        } catch (error) {
            console.error(error);
            alert("Failed to delete payment.");
        }
    };

    const deleteAll = async () => {
        if (!confirm("Delete all payment records?")) return;

        try {
            const mobiles = [
                ...new Set(payments.map((payment) => payment.mobile)),
            ];

            for (const mobile of mobiles) {
                await deleteAllPaymentDetails({ data: { mobile } });
            }

            setPayments([]);
        } catch (error) {
            console.error(error);
            alert("Failed to delete all payment records.");
        }
    };

    if (loading) return <p>Loading payments...</p>;

    return (
        <div className="space-y-4 p-4">
            <h1 className="text-xl font-bold">Member Payments</h1>

            <form
                id="add-payment-form"
                action={addPayment}
                className="space-y-3 rounded-lg border p-4"
            >
                <h2 className="font-semibold md:text-base text-sm">Add Payment (Copy Phone numbers from approved users section)</h2>

                <input
                    type="text"
                    name="mobile"
                    placeholder="Enter their phone number"
                    required
                    className="w-full rounded border p-2"
                />

                <input
                    type="text"
                    name="paymentStatus"
                    placeholder="Payment Status"
                    required
                    className="w-full rounded border p-2"
                />

                <input
                    type="text"
                    name="paymentDues"
                    placeholder="Payment Dues"
                    required
                    className="w-full rounded border p-2"
                />

                <button
                    type="submit"
                    disabled={adding}
                    className="rounded bg-green-700 px-4 py-2 font-medium text-white disabled:opacity-50"
                >
                    {adding ? "Adding..." : "Add Payment"}
                </button>
            </form>

            <div className="flex justify-between">
                <h2 className="text-lg font-semibold">Existing Payments</h2>

                <button
                    type="button"
                    onClick={deleteAll}
                    disabled={payments.length === 0}
                    className="rounded bg-red-600 px-3 py-2 text-white disabled:opacity-50"
                >
                    Delete All
                </button>
            </div>

            {payments.length === 0 ? (
                <p>No payment details found.</p>
            ) : (
                payments.map((payment) => (
                    <div
                        key={payment.mobile}
                        className="space-y-3 rounded-lg border p-4 bg-white/10"
                    >
                        <p className="font-semibold">Name : {payment.applicantName}</p>
                        <p className="text-sm">Phone No : {payment.mobile}</p>

                        <input
                            type="text"
                            value={payment.paymentStatus}
                            onChange={(e) =>
                                setPayments((prev) =>
                                    prev.map((item) =>
                                        item.mobile === payment.mobile
                                            ? { ...item, paymentStatus: e.target.value }
                                            : item
                                    )
                                )
                            }
                            placeholder="Payment Status"
                            className="w-full rounded border p-2"
                        />

                        <input
                            type="text"
                            value={payment.paymentDues}
                            onChange={(e) =>
                                setPayments((prev) =>
                                    prev.map((item) =>
                                        item.mobile === payment.mobile
                                            ? { ...item, paymentDues: e.target.value }
                                            : item
                                    )
                                )
                            }
                            placeholder="Payment Dues"
                            className="w-full rounded border p-2"
                        />

                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={() => updatePayment(payment)}
                                className="rounded bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800"
                            >
                                Update
                            </button>

                            <button
                                type="button"
                                onClick={() => deletePayment(payment)}
                                className="rounded border border-red-300 px-4 py-2 font-medium text-red-600 hover:bg-red-50"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default AdminUpdatePaymentDetaills;