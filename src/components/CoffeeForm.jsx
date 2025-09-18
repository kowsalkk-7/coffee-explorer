import { motion } from "framer-motion";

export default function CoffeeForm({ formData, setFormData, onSave, onCancel }) {
  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const inputVariants = {
    rest: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    hover: {
      y: -5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className="bg-neutral-900 p-10 rounded-2xl shadow-2xl w-full max-w-xl border-3 border-amber-800 transition-all duration-300"
    >
      <h2 className="text-4xl font-extrabold text-center text-amber-500 mb-8 font-sans tracking-tight uppercase">
        {formData.id ? "Refine Your Brew" : "Craft Your Brew"}
      </h2>

      <motion.div
        variants={inputVariants}
        whileHover="hover"
        whileTap="rest"
        className="mb-6"
      >
        <label className="block text-sm font-light text-neutral-300 mb-2 tracking-wider" htmlFor="title">
          Brew Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="e.g., Ethiopian Yirgacheffe"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full p-4 bg-neutral-800 text-white rounded-lg border-2 border-neutral-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-neutral-500 transition-all duration-300 font-sans"
        />
      </motion.div>

      <motion.div
        variants={inputVariants}
        whileHover="hover"
        whileTap="rest"
        className="mb-6"
      >
        <label className="block text-sm font-light text-neutral-300 mb-2 tracking-wider" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          placeholder="A rich, full-bodied coffee with notes of chocolate and berries."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows="4"
          className="w-full p-4 bg-neutral-800 text-white rounded-lg border-2 border-neutral-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-neutral-500 transition-all duration-300 font-sans"
        />
      </motion.div>

      <motion.div
        variants={inputVariants}
        whileHover="hover"
        whileTap="rest"
        className="mb-8"
      >
        <label className="block text-sm font-light text-neutral-300 mb-2 tracking-wider" htmlFor="ingredients">
          Ingredients (comma separated)
        </label>
        <input
          id="ingredients"
          type="text"
          placeholder="e.g., Espresso, Milk, Cocoa Powder"
          value={formData.ingredients}
          onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
          className="w-full p-4 bg-neutral-800 text-white rounded-lg border-2 border-neutral-700 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 placeholder-neutral-500 transition-all duration-300 font-sans"
        />
      </motion.div>

      <div className="flex justify-between items-center space-x-4">
        <motion.button
          onClick={onCancel}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-6 py-3 bg-neutral-700 text-neutral-300 rounded-xl font-semibold hover:bg-neutral-600 transition-colors shadow-md"
        >
          Cancel
        </motion.button>
        <motion.button
          onClick={onSave}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex-1 px-6 py-3 bg-amber-600 text-neutral-900 rounded-xl font-semibold hover:bg-amber-700 transition-colors shadow-md"
        >
          {formData.id ? "Update" : "Create"}
        </motion.button>
      </div>
    </motion.div>
  );
}