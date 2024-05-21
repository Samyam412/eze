export {};

// Create a type for the roles
export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

export type FilteredUser = {
  id: string;
  fullName: string | null;
  imageUrl: string;
  primaryPhoneNumber: string;
  primaryEmailAddress: string | undefined;
};

export type Order = {
  number: string;
  id: string;
  paymentMethod: "Cash" | "Online";
  orderStatus: "Pending" | "Accepted" | "Deliverd" | "Canceled";
  address: string;
  details: string | null;
  userId: string;
  createdAt: Date;
  userDetail?: UserDetail | null; // Optional user detail
  orderProducts: OrderProducts[];
  notes: string | null;
  total: number | null; // Optional total amount
};

export type UserDetail = {
  id: string;
  fullName: string | null;
  imageUrl: string;
  primaryPhoneNumber: string;
  primaryEmailAddress: string | undefined;
};

export type OrderProducts = {
  id: string;
  orderId: string | null; // Optional order ID (might be null)
  productId: string | null; // Optional product ID (might be null)
  quantity: number;
  product: Product | null; // Optional product details
};

export type Product = {
  id: string;
  name: string;
  description: string | null; // Optional description
  price: number;
  stock: number | null; // Optional stock level (might be null)
  images: string | null; // Optional image URLs (might be a comma-separated string)
  categoryId: string | null; // Optional category ID (might be null)
};

export type CreatedAtQuery = {
  gte?: Date;
  lte?: Date;
};
