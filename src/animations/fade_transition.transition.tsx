import { motion } from "framer-motion";

const fade_transition = (OriginalComponent: any) => {
	return (props: any) => (
		<motion.div
			style={{
				display: "none",
				opacity: 0,
			}}
			initial={{ opacity: 0, display: "block" }}
			animate={{ opacity: 1, display: "block", transition: { duration: 0.25, ease: "easeInOut" } }}
			exit={{
				opacity: 0,
				display: "none",
				transition: { duration: 0.25, ease: "easeInOut" },
			}}>
			<OriginalComponent {...props} />
		</motion.div>
	);
};

export default fade_transition;
