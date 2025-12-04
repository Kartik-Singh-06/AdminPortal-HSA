"use client";

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Container, Card, CardContent, CardMedia, Typography, Button, Grid, Chip, Box,
  Rating, CircularProgress
} from '@mui/material';
import ProtectedRoutes from '@/Components/ProtectedRoutes';
import axios from 'axios';

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/products/${params.id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Product fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchProduct();
  }, [params.id]);


  const styles = {
    page: { backgroundColor: '#121212', minHeight: '100vh', py: 3 },
    backButton: {
      borderColor: '#555',
      color: '#fff',
      mb: 3,
      '&:hover': {
        borderColor: '#777',
      },
    },
    card: {
      backgroundColor: '#2a2a2a',
      color: '#fff',
      borderRadius: '8px',
    },
    chip: {
      backgroundColor: '#424242',
      color: '#fff',
      mr: 1,
      mb: 1,
    },
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        backgroundColor: '#121212'
      }}>
        <CircularProgress sx={{ color: '#fff' }} />
      </Box>
    );
  }
  
  if (!product) {
    return (
      <Box sx={{ 
        backgroundColor: '#121212', 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography variant="h5" sx={{ color: '#fff' }}>
          Product not found
        </Typography>
      </Box>
    );
  }
  
  return (
    <ProtectedRoutes>
      <Box sx={styles.page}>
        <Container>
          <Button 
            onClick={() => router.back()} 
            variant="outlined" 
            sx={styles.backButton}
          >
            ← Back to products
          </Button>
          <Grid container spacing={3}>
            {/* Image */}
            <Grid item xs={12} md={6}>
              <Card sx={styles.card}>
                <CardMedia
                  component="img"
                  sx={{ 
                    height: { xs: 250, sm: 350 },
                    objectFit: 'contain',
                    p: 2
                  }}
                  image={product.thumbnail}
                  alt={product.title}
                />
              </Card>
            </Grid>
            
            {/* Details */}
            <Grid item xs={12} md={6}>
              <Card sx={{ ...styles.card, height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  {/* Title */}
                  <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
                    {product.title}
                  </Typography>
                  
                 
                  <Box sx={{ mb: 2 }}>
                    <Chip label={product.category} sx={styles.chip} />
                    <Chip label={product.brand} sx={styles.chip} />
                  </Box>
                  <Typography variant="h4" sx={{ color: '#4dabf5', mb: 2 }}>
                    ${product.price}
                  </Typography>
                  
                  {/* Rating */}
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Rating value={product.rating} readOnly sx={{ color: '#ffb74d' }} name="half-rating" precision={0.5} />
                    <Typography sx={{ color: '#aaa', ml: 1 }}>
                      {product.rating.toFixed(1)}
                    </Typography>
                  </Box>
                  
                  <Typography sx={{ 
                    color: product.stock > 0 ? '#81c784' : '#f44336',
                    mb: 3 
                  }}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </Typography>
                  
                  {/* Description */}
                  <Typography variant="body1" sx={{ color: '#ddd', mb: 3 }}>
                    {product.description}
                  </Typography>

                  <Box sx={{ 
                    backgroundColor: '#1e1e1e', 
                    p: 2, 
                    borderRadius: '6px',
                    mt: 2
                  }}>
                    <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
                      <strong>SKU:</strong> {product.id}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#aaa' }}>
                      <strong>Discount:</strong> {product.discountPercentage || 0}%
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ProtectedRoutes>
  );
}