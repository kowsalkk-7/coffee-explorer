import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import coffeeService from "./service/coffeeService";
import CoffeeCard from "./components/CoffeeCard";
import CoffeeForm from "./components/CoffeeForm";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function CoffeeExplorer() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", ingredients: "" });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await coffeeService.getAll();
      const validCoffees = response.filter(
        (item) => item?.id && item?.title?.trim()
      );
      setCoffees(validCoffees);
    } catch {
      toast.error("Failed to fetch coffees");
    } finally {
      setLoading(false);
    }
  }

  const handleSave = async () => {
    if (!formData.title.trim()) return toast.error("Title is required!");
    try {
      let updated;
      const payload = {
        ...formData,
        ingredients: formData.ingredients ? formData.ingredients.split(',').map(item => item.trim()).filter(item => item) : []
      };

      if (formData.id) {
        updated = await coffeeService.update(formData.id, payload);
        setCoffees((prev) => prev.map((c) => (c.id === formData.id ? updated : c)));
        toast.success("Updated Successfully!");
      } else {
        updated = await coffeeService.create(payload);
        setCoffees((prev) => [...prev, updated]);
        toast.success("Created Successfully!");
      }
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to update the information.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await coffeeService.remove(id);
      setCoffees((prev) => prev.filter((c) => c.id !== id));
      toast.info("Deleted Successfully!");
    } catch {
      toast.error("Failed to delete the data.");
    }
  };

  const staggerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white font-sans flex flex-col">
      <ToastContainer position="top-right" theme="dark" />
      <Header />

      <motion.section
        className="relative h-[400px] md:h-[350px] w-full overflow-hidden flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1497935681416-a7e025daec87?q=80&w=2600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 text-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-tight mb-2 drop-shadow-md"
          >
            Coffee - Makes you Love
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.6 }}
            className="text-lg md:text-xl font-light text-white/90 max-w-xl mx-auto mb-8"
          >
            A Lot Can Happen Over Coffee, Its Awesome!!!
          </motion.p>
        </div>
      </motion.section>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setFormData({ title: "", description: "", ingredients: "" });
          setIsModalOpen(true);
        }}
        className="fixed bottom-8 right-8 bg-amber-500 text-neutral-950 p-4 rounded-full shadow-2xl z-50 text-2xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        </svg>
      </motion.button>

      <main className="flex-grow max-w-[1500px] mx-auto p-6">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-[50vh] text-gray-500"
          >
            <svg
              className="animate-spin h-10 w-10 text-amber-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <p className="mt-4 text-lg">Loading...</p>
          </motion.div>
        ) : (
          <AnimatePresence>
            {coffees.length > 0 ? (
              <motion.div
                layout
                variants={staggerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {coffees.map((coffee) => (
                  <motion.div
                    key={coffee.id}
                    variants={itemVariants}
                  >
                    <CoffeeCard
                      coffee={coffee}
                      onEdit={(c) => {
                        setFormData({
                          ...c,
                          ingredients: c.ingredients?.join(", ") || "",
                        });
                        setIsModalOpen(true);
                      }}
                      onDelete={handleDelete}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <p className="text-center text-gray-500 col-span-full mt-10">No coffees found. Add a new one!</p>
            )}
          </AnimatePresence>
        )}
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-xl"
            >
              <CoffeeForm
                formData={formData}
                setFormData={setFormData}
                onSave={handleSave}
                onCancel={() => setIsModalOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </div>
  );
}