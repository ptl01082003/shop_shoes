import { useEffect, useState } from "react";
import BrandService from "../../services/BrandApi";

const BrandList: React.FC = () => {
  // Assume products is fetched from API or props
  const [brands, setBrands] = useState<any[]>([]);

  // Example useEffect fetching brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await BrandService.getBrands(); // Replace with your API call
        setBrands(response.data); // Update brands state with fetched data
      } catch (error) {
        console.log(error);
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  return (
    <div>
      <h2>Danh sách thương hiệu</h2>
      <ul>
        {brands &&
          brands.map(
            (
              brand // Check if brands is not undefined or null
            ) => (
              <li key={brand.id}>
                {brand.name} - {brand.description}
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default BrandList;
