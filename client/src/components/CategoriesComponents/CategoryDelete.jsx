import styles from "../../styles/CategoriesComponents/CategoryDelete.module.scss";
import { Title } from "../Titles/Titles";
import { queryClient } from "../../constants/config";
import { useState } from "react";
import { useCategoriesGet, useCategoryDelete } from "../../queries/category";
import Spinner from "../../components/Spinner";
import { useEffect } from "react";

const CategoryDelete = () => {
const {
data: ctgs,
isLoading: ctgsLoading,
isRefetching: ctgsRefetching,
isSuccess: ctgsSuccess,
} = useCategoriesGet();
const [category, setCategory] = useState();
const {
mutate: deleteCategory,
isLoading: deletingCategory,
isError,
isSuccess,
error,
} = useCategoryDelete();

useEffect(() => {
setCategory(ctgs?.data?.ctgs[0]);
}, [ctgs]);

return (
<div className={styles.categoryContainer}>
{/* DELETE CTG */}
<Title>Delete Category</Title>
{ctgs?.data?.ctgs?.length > 0 &&
ctgsSuccess &&
!ctgsLoading &&
!ctgsRefetching ? (
<form onSubmit={(e) => e.preventDefault()}>
<select
value={category?.id}
onChange={(e) =>
setCategory(
ctgs?.data?.ctgs.find((ctg) => ctg.id === e.target.value)
)
}
>
{ctgs?.data?.ctgs?.map((category, index) => {
return (
<option key={index} value={category.id}>
{category.name}
</option>
);
})}
</select>
<button
onClick={() =>
deleteCategory(category?.id, {
onSuccess: () => {
queryClient.invalidateQueries("Categories");
},
})
}
>
Delete Category
</button>
{isError && (
<p style={{ color: "red" }}>
{JSON.stringify(error?.response?.data?.message)}
</p>
)}
{isSuccess && (
<p style={{ color: "green" }}>
{" "}
Category has been deleted successfully!
</p>
)}
</form>
) : ctgsLoading || ctgsRefetching ? (
<span>Loading Categories...</span>
) : (
<span>No Categories To Delete</span>
)}
{deletingCategory && <Spinner fullPage />}
</div>
);
};

export default CategoryDelete;
