import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

const ProductCard = ({
  product,
  theme,
  handleDelete,
  handleEdit,
  navigateProductDetail,
}) => {
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
      key={product.id}
    >
      <CardContent>
        <CardMedia
          component="img"
          height="350"
          image={
            product.productImages.length > 0
              ? product.productImages[0].imageUrl
              : "https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0="
          }
          alt="Paella dish"
          sx={{
            borderRadius: "0.55rem",
          }}
        />
        <Typography variant="h5" component="div" sx={{ mt: "1.5rem" }}>
          {product.name}
        </Typography>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[400]}
          gutterBottom
        >
          Category: {product.categoryName}
        </Typography>
        <Typography color={theme.palette.secondary[400]}>
          ${Number(product.price).toFixed(2)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          sx={{ backgroundColor: theme.palette.grey[600] }}
          onClick={() => navigateProductDetail(product.id)}
        >
          See More
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleEdit(product.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={() => handleDelete(product.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
