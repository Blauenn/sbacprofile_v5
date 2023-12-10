import { useTranslation } from "react-i18next";

const No_results = () => {
  const { t } = useTranslation("common");

  return (
    <div className="flex justify-between flex-col gap-4 opacity-50">
      <div className="mt-8 flex justify-center items-center flex-col opacity-75">
        <i className="text-5xl sm:text-8xl fa-solid fa-face-frown mb-4"></i>
        <h1 className="text-2xl sm:text-4xl">
          {t("noResults_message")}
        </h1>
      </div>
    </div>
  );
};

export default No_results;
