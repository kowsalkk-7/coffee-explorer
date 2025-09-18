import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEdit, FaTrashAlt, FaCoffee, FaInfoCircle, FaUtensils, FaExclamationTriangle } from "react-icons/fa";
import { Tooltip } from "@mui/material";

export default function CoffeeCard({ coffee, onEdit, onDelete }) {
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const {
        id,
        title,
        description,
        ingredients,
        image
    } = coffee || {};

    const handleConfirmDelete = () => {
        onDelete(id);
        setIsConfirmOpen(false);
    };

    const truncationStyles = {
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    };

    return (
        <>
            <motion.div
                whileHover="hover"
                initial="rest"
                animate="rest"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="bg-neutral-900 shadow-2xl rounded-2xl overflow-hidden border border-amber-800 transition-all duration-300 flex flex-col h-full group"
            >
                <div className="relative w-full h-90 overflow-hidden flex-shrink-0">
                    <img
                        src={image || "https://images.unsplash.com/photo-1541167718012-3214434914c8?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-115"
                    />

                    <motion.div
                        variants={{
                            rest: { opacity: 0, backdropFilter: "blur(0px)" },
                            hover: { opacity: 1, backdropFilter: "blur(4px)" },
                        }}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center transition-all duration-300"
                    >
                        <Tooltip title="Edit Coffee" arrow>
                            <motion.button
                                variants={{
                                    rest: { scale: 0.8, opacity: 0 },
                                    hover: { scale: 1, opacity: 1 },
                                }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onEdit(coffee)}
                                className="p-4 rounded-full bg-amber-600 text-neutral-900 mx-2 shadow-lg hover:bg-amber-500 transition-colors cursor-pointer"
                            >
                                <FaEdit size={24} />
                            </motion.button>
                        </Tooltip>

                        <Tooltip title="Delete Coffee" arrow>
                            <motion.button
                                variants={{
                                    rest: { scale: 0.8, opacity: 0 },
                                    hover: { scale: 1, opacity: 1 },
                                }}
                                transition={{ delay: 0.05 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsConfirmOpen(true)}
                                className="p-4 rounded-full bg-red-600 text-white mx-2 shadow-lg hover:bg-red-500 transition-colors cursor-pointer"
                            >
                                <FaTrashAlt size={24} />
                            </motion.button>
                        </Tooltip>
                    </motion.div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <h3
                        className="text-2xl font-bold text-amber-500 tracking-wider mb-2 flex items-center"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontWeight: 600,
                            color: "#F59E0B",
                            letterSpacing: "0.05em",
                            textTransform: "uppercase",
                            fontSize: "1.5rem",
                            textShadow: "1px 1px 2px rgba(0,0,0,0.8)"
                        }}
                    >
                        <FaCoffee className="mr-3" />
                        {title}
                    </h3>

                    <Tooltip title={description} placement="top" arrow>
                        <p
                            className="text-base text-neutral-300 mt-2 leading-relaxed mb-4 flex items-start flex-grow"
                            style={truncationStyles}
                        >
                            <FaInfoCircle className="mr-3 mt-1 text-neutral-400 flex-shrink-0" />
                            <span className="flex-grow">{description}</span>
                        </p>
                    </Tooltip>

                    <div className="border-t border-neutral-700 pt-4 flex items-center flex-shrink-0 mt-auto">
                        <FaUtensils className="mr-3 text-neutral-500" />
                        <span className="font-semibold text-neutral-300 text-sm">Ingredients:</span>
                        <span className="font-light truncate ml-2 text-neutral-400 text-sm">
                            {ingredients.length > 0 ? ingredients.join(", ") : "Not specified."}
                        </span>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {isConfirmOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
                        onClick={() => setIsConfirmOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: -50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.8, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="relative bg-neutral-900 p-8 rounded-2xl shadow-2xl w-[600px] border border-red-600/40 transform -rotate-1"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative z-10">
                                <div className="flex items-center mb-4">
                                    <FaExclamationTriangle className="text-red-500 text-3xl mr-3 flex-shrink-0" />
                                    <h4 className="text-2xl font-bold text-red-500 tracking-wide font-serif">
                                        Warning!
                                    </h4>
                                </div>

                                <p className="text-neutral-300 mb-6 leading-relaxed">
                                    Are you sure you want to proceed with the deletion of this coffee item? This action is irreversible.
                                </p>

                                <div className="flex justify-end gap-4 mt-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsConfirmOpen(false)}
                                        className="px-6 py-2 rounded-lg font-semibold text-neutral-300 border border-neutral-600 hover:bg-neutral-700 transition-colors"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleConfirmDelete}
                                        className="px-6 py-2 rounded-lg font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors shadow-lg"
                                    >
                                        <FaTrashAlt className="inline-block mr-2" /> Delete
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}