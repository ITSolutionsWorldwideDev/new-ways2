import { useCurrency } from "@/context/currencyContext";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { supportedCurrencies } from "@/lib/currency";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <Select value={currency} onValueChange={(val) => setCurrency(val as any)}>
      <SelectTrigger className="w-[100px] sm:w-[140px] border-none">
        <SelectValue placeholder="Currency" />
      </SelectTrigger>
      <SelectContent>
        {supportedCurrencies.map((curr) => (
          <SelectItem key={curr.id} value={curr.id}>
            {curr.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
