import { Box, Typography, IconButton, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { FaTwitter, FaInstagram, FaYoutube, FaSpotify, FaPinterest } from 'react-icons/fa';

export default function Footer() {
  const socialLinks = [
    { icon: <FaSpotify />, href: "https://spotify.com" },
    { icon: <FaTwitter />, href: "https://x.com" },
    { icon: <FaInstagram />, href: "https://instagram.com" },
    { icon: <FaYoutube />, href: "https://youtube.com" },
    { icon: <FaPinterest />, href: "https://pinterest.com" },
  ];

  const legalLinks = [
    "Privacy Notice",
    "Consumer Health Privacy Notice",
    "Terms of Use",
    "Do Not Sell or Share My Personal Information",
    "Cookie Preferences",
  ];

  const iconVariants = {
    hover: { scale: 1.2, color: "#F59E0B" },
    tap: { scale: 0.9 },
  };

  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-12 py-8 px-6 border-t-2 border-amber-800">
      <div className="max-w-[1500px] mx-auto flex flex-col items-center">

        <Box className="flex justify-center space-x-4 mb-6">
          {socialLinks.map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={iconVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <IconButton sx={{ color: "#FCD34D" }}>
                {social.icon}
              </IconButton>
            </motion.a>
          ))}
        </Box>

        <Box className="flex flex-col items-center text-center space-y-3 mb-6">
          {legalLinks.map((link, index) => (
            <Typography
              key={index}
              variant="body2"
              sx={{
                fontFamily: "'Cormorant Garamond', serif",
                color: "#FCD34D",
                opacity: 0.8,
                "&:hover": {
                  color: "#F59E0B",
                  cursor: "pointer",
                },
              }}
            >
              {link}
            </Typography>
          ))}
        </Box>

        <Divider sx={{ backgroundColor: "rgba(245, 158, 11, 0.4)", width: "100%", my: 2 }} />
        <Typography
          variant="body2"
          sx={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "#FCD34D",
            opacity: 0.8,
            marginTop: "1rem",
          }}
        >
          © {new Date().getFullYear()} The Coffee Shop. All rights reserved.
        </Typography>

      </div>
    </footer>
  );
}