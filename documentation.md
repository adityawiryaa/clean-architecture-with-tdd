# api : localhost:3000/


<!-- product -->

```
# 1.Product
```

# A.create-product

```
Endpoint :

# POST : product/create
# body :{
    "name" : "SAMSUNG",
    "price" : 500000,
    "stock" : 20
}

```

<!-- cart -->

```
# 2.Cart
```

# A.add-item

```
Endpoint :

# POST : cart/add-item
# body :{
    "productId" : 5,
    "qty" : 2
}
```