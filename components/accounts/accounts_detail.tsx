// components/accounts/accounts_detail.tsx
"use client";
import React, { useEffect, useState } from "react";
// import { useUser } from "@/context/userContext";
import { useSessionStore } from "@/store/useSessionStore";
import Loading from "@/components/ui/Loading";
import { useToast } from "@/hooks/use-toast";

const countries = [
  { id: "NL", refName: "Netherlands" },
  { id: "DE", refName: "Germany" },
  { id: "FR", refName: "France" },
  { id: "BE", refName: "Belgium" },
  { id: "UK", refName: "United Kingdom" },
];

export default function AccountsDetails() {
  // const { user } = useUser();
  const { user, loading } = useSessionStore();
  // const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // const [loadingLocal, setLoadingLocal] = useState(true);
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);
  const [loadingAccount, setLoadingAccount] = useState(true); // Local loading for API

  

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    country: { id: "NL", refName: "Netherlands" },
    address: "",
    city: "",
    zip: "",
    phone: "",
    email: "",

    // Billing Info (only used if "Use a different billing address" is selected)
    billingFirstName: "",
    billingLastName: "",
    billingCountry: { id: "NL", refName: "Netherlands" },
    billingAddress: "",
    billingCity: "",
    billingZip: "",
    billingPhone: "",
    billingEmail: "",
  });


  useEffect(() => {
    if (!user?.userId) return;

    let ignore = false;

    async function fetchAccount() {
      try {
        setLoadingAccount(true);

        const res = await fetch(`/api/account-details?userId=${user?.userId}`);
        const text = await res.text();

        if (!text || ignore) return;

        const data = JSON.parse(text);
        const acc = data.account?.[0];

        if (acc) {
          const hasBillingAddress = !!acc.billingfirstname;
          setUseDifferentBilling(hasBillingAddress);

          setForm({
            // Shipping
            firstName: acc.firstName || "",
            lastName: acc.lastName || "",
            email: acc.email || "",
            phone: acc.addrPhone || "",
            address: acc.addr1 || "",
            city: acc.city || "",
            zip: acc.zip || "",
            country: {
              id: acc.country || "",
              refName:
                countries.find((c) => c.id === acc.country)?.refName || "",
            },

            // Billing (only shown if `useDifferentBilling` is true)
            billingFirstName: acc.billingfirstname || "",
            billingLastName: acc.billinglastname || "",
            billingEmail: acc.billingemail || "",
            billingPhone: acc.billingphone || "",
            billingAddress: acc.billingaddress || "",
            billingCity: acc.billingcity || "",
            billingZip: acc.billingzip || "",
            billingCountry: {
              id: acc.billingcountry || "",
              refName:
                countries.find((c) => c.id === acc.billingcountry)?.refName ||
                "",
            },
          });
        }
      } catch (err) {
        console.error("Error fetching account details:", err);
        toast({
          title: "Error",
          description: "Failed to load account details.",
          variant: "destructive",
        });
      } finally {
        setLoadingAccount(false);
      }
    }

    fetchAccount();

    return () => {
      ignore = true;
    };
  }, [user?.userId]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName) errs.firstName = "First name is required";
    if (!form.lastName) errs.lastName = "Last name is required";

    if (!form.country?.id) {
      errs.country = "Country is required";
    }

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      errs.email = "Email is not valid";
    }

    if (!form.zip) errs.zip = "Postcode is required";

    if (!form.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{7,}$/.test(form.phone)) {
      errs.phone = "Phone must be at least 7 digits";
    }

    return errs;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setErrors({});

    const payload = {
      userId: user?.userId,
      firstName: form.firstName,
      lastName: form.lastName,
      addrPhone: form.phone,
      // shipping...
      addr1: form.address,
      city: form.city,
      zip: form.zip,
      country: form.country.id,
      // billing...
      ...(useDifferentBilling && {
        billingFirstName: form.billingFirstName,
        billingLastName: form.billingLastName,
        billingPhone: form.billingPhone,
        billingEmail: form.billingEmail,
        billingAddress: form.billingAddress,
        billingCity: form.billingCity,
        billingZip: form.billingZip,
        billingCountry: form.billingCountry?.id || "",
      }),
    };

    try {
      const res = await fetch("/api/account-details", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update account details");
      }

      

      toast({
        title: "Record Saved!",
        description: "Account Updated successfully",
      });
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving your details.");
    }
  };

  if (loading || loadingAccount) return <Loading />;

  return (
    <div className="">
      <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">
        Accounts Details
      </h3>

      {loading ? (
        <Loading />
      ) : (
        <div className="flex gap-8 items-start">
          <div className="flex-1 bg-background rounded-lg shadow p-6 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First name / Last name */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    name="firstName"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="flex-1 border border-border rounded px-4 py-2 bg-background text-foreground w-full"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm">{errors.firstName}</p>
                  )}
                </div>
                <div className="flex-1">
                  <input
                    name="lastName"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={handleChange}
                    className="flex-1 border border-border rounded px-4 py-2 bg-background text-foreground w-full"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Address */}
              <input
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
              />

              <div className="flex gap-4">
                <span className="w-1/3">
                  <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                    className="w-full border border-border rounded px-4 py-2 bg-background text-foreground"
                  />
                </span>
                <span className="w-1/3">
                  <input
                    name="zip"
                    placeholder="ZIP code"
                    value={form.zip}
                    onChange={handleChange}
                    className="w-full border border-border rounded px-4 py-2 bg-background text-foreground"
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm">{errors.zip}</p>
                  )}
                </span>
                <span className="w-1/3">
                  <input
                    name="phone"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full border border-border rounded px-4 py-2 bg-background text-foreground"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </span>
              </div>

              {/* Country */}
              <label className="block text-sm font-medium mt-2">
                Country *
              </label>
              <select
                name="country"
                value={form.country.id}
                onChange={(e) => {
                  const selected = countries.find(
                    (c) => c.id === e.target.value
                  );
                  if (selected) {
                    setForm((prev) => ({
                      ...prev,
                      country: selected, // store both id and refName for display
                    }));
                  }
                  //   if (selected) setForm({ ...form, country: selected });
                }}
                className="w-full border border-border rounded px-3 py-2 bg-background text-foreground"
              >
                <option value="">Select country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.refName}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm">{errors.country}</p>
              )}

              {/* Email */}
              <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="border border-border rounded px-4 py-2 w-full bg-background text-foreground mt-2"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">{errors.email}</p>
              )}

              {/* Billing address options */}
              <h3 className="font-semibold mt-6">Billing Address</h3>
              <div className="space-y-2">
                {/* <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="billingOption"
                    value="same"
                    checked={!useDifferentBilling}
                    onChange={() => setUseDifferentBilling(false)}
                  />
                  Use shipping address as billing address
                </label> */}
                {/* <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="billingOption"
                    value="different"
                    checked={useDifferentBilling}
                    onChange={() => setUseDifferentBilling(true)}
                  />
                  Use a different billing address
                </label> */}
                <label className="flex items-center gap-2 mt-2">
                  <input
                    name="billingSameAsShipping"
                    type="checkbox"
                    checked={useDifferentBilling}
                    onChange={() => setUseDifferentBilling((prev) => !prev)}
                  />
                  Use a different billing address
                </label>
              </div>

              {/* Conditional billing form */}
              {useDifferentBilling && (
                <div className="mt-4 border border-border rounded p-4 space-y-4 bg-muted/20">
                  <div className="flex gap-4">
                    <input
                      name="billingFirstName"
                      placeholder="Billing first name"
                      value={form.billingFirstName || ""}
                      onChange={handleChange}
                      className="flex-1 border border-border rounded px-4 py-2 bg-background text-foreground"
                    />
                    <input
                      name="billingLastName"
                      placeholder="Billing last name"
                      value={form.billingLastName || ""}
                      onChange={handleChange}
                      className="flex-1 border border-border rounded px-4 py-2 bg-background text-foreground"
                    />
                  </div>

                  <input
                    name="billingAddress"
                    placeholder="Billing address"
                    value={form.billingAddress || ""}
                    onChange={handleChange}
                    className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                  />

                  <div className="flex gap-4">
                    <input
                      name="billingCity"
                      placeholder="Billing city"
                      value={form.billingCity || ""}
                      onChange={handleChange}
                      className="w-1/3 border border-border rounded px-4 py-2 bg-background text-foreground"
                    />
                    <input
                      name="billingZip"
                      placeholder="Billing ZIP"
                      value={form.billingZip || ""}
                      onChange={handleChange}
                      className="w-1/3 border border-border rounded px-4 py-2 bg-background text-foreground"
                    />
                    <input
                      name="billingPhone"
                      placeholder="Billing phone"
                      value={form.billingPhone || ""}
                      onChange={handleChange}
                      className="w-1/3 border border-border rounded px-4 py-2 bg-background text-foreground"
                    />
                  </div>

                  <input
                    name="billingEmail"
                    placeholder="Billing email"
                    value={form.billingEmail || ""}
                    onChange={handleChange}
                    className="border border-border rounded px-4 py-2 w-full bg-background text-foreground"
                  />

                  <label className="block text-sm font-medium mt-2">
                    Billing Country *
                  </label>
                  <select
                    name="billingCountry"
                    value={form.billingCountry?.id || ""}
                    onChange={(e) => {
                      const selected = countries.find(
                        (c) => c.id === e.target.value
                      );
                      if (selected)
                        setForm((prev: any) => ({
                          ...prev,
                          billingCountry: selected,
                        }));
                    }}
                    className="w-full border border-border rounded px-3 py-2 bg-background text-foreground"
                  >
                    <option value="">Select country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.refName}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Save Details
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

  /* useEffect(() => {
    if (!user?.userId) return;

    let ignore = false;

    async function fetchAccount() {
      try {
        setLoading(true);
        const res = await fetch(`/api/account-details?userId=${user?.userId}`);
        const text = await res.text();
        if (!text || ignore) return;

        const data = JSON.parse(text);
        const acc = data.account?.[0];

        if (acc) {
          const hasBillingAddress = !!acc.billingfirstname;

          setUseDifferentBilling(hasBillingAddress); // ✅ This will auto-check the box

          setForm({
            // Shipping
            firstName: acc.firstName || "",
            lastName: acc.lastName || "",
            email: acc.email || "",
            phone: acc.addrPhone || "",
            address: acc.addr1 || "",
            city: acc.city || "",
            zip: acc.zip || "",
            country: {
              id: acc.country || "",
              refName:
                countries.find((c) => c.id === acc.country)?.refName || "",
            },

            // Billing (initially blank — only shown if `useDifferentBilling === true`)
            billingFirstName: acc.billingfirstname || "",
            billingLastName: acc.billinglastname || "",
            billingEmail: acc.billingemail || "",
            billingPhone: acc.billingphone || "",
            billingAddress: acc.billingaddress || "",
            billingCity: acc.billingcity || "",
            billingZip: acc.billingzip || "",
            billingCountry: {
              id: acc.billingcountry || "",
              refName:
                countries.find((c) => c.id === acc.billingcountry)?.refName ||
                "",
            },
          });
        }
      } catch (err) {
        console.error("Error fetching account details:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAccount();
    return () => {
      ignore = true;
    };
  }, [user?.userId]); */

  
  /* useEffect(() => {
    // Simulating some loading here
    setTimeout(() => {
      setLoadingLocal(false);
    }, 300);
  }, []);

  if (loading || loadingLocal) return <Loading />; */

  
