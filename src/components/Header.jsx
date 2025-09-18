
import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';
import logo from "../assets/coffee_logo.jpg";

export default function Header() {
  const navLinks = [
    { name: "Menu", href: "" },
    { name: "About Us", href: "" },
  ];

  const socialLinks = [
    { icon: <FaTwitter />, href: "https://x.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaYoutube />, href: "https://youtube.com" },
  ];

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
    >
      <AppBar
        position="sticky"
        sx={{
          background: "linear-gradient(to right, #1a1000, #332100)",
          boxShadow: "0 6px 12px rgba(0, 0, 0, 0.5)",
          borderBottom: "2px solid #F59E0B",
        }}
      >
        <Toolbar className="max-w-[1500px] mx-auto w-full px-6 flex justify-between items-center py-4">
          <Box className="flex items-center space-x-2 sm:space-x-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            >
              <img
                src={logo}
                alt="The coffee shop logo"
                className="h-10 w-10 sm:h-16 sm:w-16 rounded-full border-2 border-amber-500 p-1 object-cover shadow-lg"
              />
            </motion.div>
            <Box className="flex flex-col">
              <Typography
                variant="h6"
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontWeight: 600,
                  color: "#F59E0B",
                  letterSpacing: "0.05em",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.8)",
                  textTransform: "uppercase",
                  fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2.125rem" },
                }}
              >
                The Coffee Shop
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#FCD34D",
                  opacity: 0.9,
                  fontStyle: "italic",
                  letterSpacing: "0.08em",
                  fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                Your daily dose of exceptional coffee.
              </Typography>
            </Box>
          </Box>

          <Box className="flex items-center space-x-2 sm:space-x-6">
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', spaceX: 4 }}>
              {navLinks.map((link) => (
                <motion.div
                  key={link.name}
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    color="inherit"
                    href={link.href}
                    sx={{
                      fontSize: "1rem",
                      color: "#FCD34D",
                      fontWeight: 600,
                      textTransform: "none",
                      '&:hover': {
                        color: "#F59E0B",
                        backgroundColor: "rgba(245, 158, 11, 0.1)",
                      },
                    }}
                  >
                    {link.name}
                  </Button>
                </motion.div>
              ))}
            </Box>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', spaceX: 2 }}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <IconButton sx={{ color: "#FCD34D", '&:hover': { color: "#F59E0B" } }}>
                    {social.icon}
                  </IconButton>
                </motion.a>
              ))}
            </Box>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#F59E0B",
                  color: "#2c1a00",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  padding: "6px 16px",
                  borderRadius: "25px",
                  '&:hover': {
                    backgroundColor: "#FBBE24",
                    boxShadow: "0 4px 10px rgba(245, 158, 11, 0.6)",
                  },
                }}
              >
                Order Now
              </Button>
            </motion.div>
          </Box>
        </Toolbar>
      </AppBar>
    </motion.div>
  );
}