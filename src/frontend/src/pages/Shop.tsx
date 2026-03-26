import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProductCategory } from "../backend.d";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useQueries";

const ALL = "all";
const tabs = [
  { value: ALL, label: "All" },
  { value: ProductCategory.bags, label: "Bags" },
  { value: ProductCategory.clothing, label: "Clothing" },
  { value: ProductCategory.accessories, label: "Accessories" },
];

export default function Shop() {
  const [activeTab, setActiveTab] = useState(ALL);
  const [search, setSearch] = useState("");
  const { data: products, isLoading } = useProducts();

  const filtered = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      const matchesCategory =
        activeTab === ALL ||
        p.category === activeTab ||
        (activeTab !== ProductCategory.customOrders &&
          p.category !== ProductCategory.customOrders) ||
        activeTab === p.category;
      const matchesSearch =
        !search ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeTab, search]);

  return (
    <main className="min-h-screen">
      <section className="section-cream py-24" data-ocid="shop.header.section">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-gold" />
            <p className="font-body text-[10px] tracking-[0.25em] uppercase text-gold font-semibold">
              All Products
            </p>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-normal text-foreground">
            The Shop
          </h1>
          <p className="font-body text-muted-foreground mt-4 max-w-md text-base">
            Every piece is made by hand with love and the finest natural yarns.
          </p>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
              data-ocid="shop.category.tab"
            >
              <TabsList className="flex-wrap h-auto gap-1 bg-muted p-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="text-xs font-semibold tracking-[0.08em] uppercase rounded-none data-[state=active]:bg-ink data-[state=active]:text-white"
                    data-ocid={`shop.${tab.value}.tab`}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="relative max-w-xs ml-auto w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                data-ocid="shop.search.input"
                className="pl-9 rounded-none text-sm border-border bg-background"
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div
                  key={n}
                  className="space-y-3"
                  data-ocid="shop.products.loading_state"
                >
                  <Skeleton className="aspect-square" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : filtered.length > 0 ? (
            <div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              data-ocid="shop.products.list"
            >
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id.toString()}
                  product={product}
                  index={i + 1}
                />
              ))}
            </div>
          ) : (
            <div
              data-ocid="shop.products.empty_state"
              className="text-center py-28"
            >
              <p className="font-display italic text-2xl text-muted-foreground mt-4">
                No products found
              </p>
              <p className="font-body text-muted-foreground text-sm mt-2">
                Try adjusting your search or filter.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
