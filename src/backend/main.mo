import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Timestamp "mo:core/Time";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";

actor {
  type ProductCategory = {
    #bags;
    #clothing;
    #accessories;
    #customOrders;
  };

  type Product = {
    id : Nat;
    name : Text;
    description : Text;
    priceCents : Nat;
    category : ProductCategory;
    images : [Text];
    sizes : [Text];
    colors : [Text];
    stock : Nat;
  };

  type Review = {
    name : Text;
    productId : ?Nat;
    rating : Nat;
    content : Text;
    createdAt : Timestamp.Time;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    createdAt : Timestamp.Time;
  };

  module Product {
    public func compare(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.id, p2.id);
    };

    public func compareByPrice(p1 : Product, p2 : Product) : Order.Order {
      Nat.compare(p1.priceCents, p2.priceCents);
    };
  };

  module Review {
    public func compare(r1 : Review, r2 : Review) : Order.Order {
      if (r1.createdAt >= r2.createdAt) { #less } else { #greater };
    };
  };

  module ContactMessage {
    public func compare(m1 : ContactMessage, m2 : ContactMessage) : Order.Order {
      if (m1.createdAt >= m2.createdAt) { #less } else { #greater };
    };
  };

  type NewProduct = {
    name : Text;
    description : Text;
    priceCents : Nat;
    category : ProductCategory;
    images : [Text];
    sizes : [Text];
    colors : [Text];
    stock : Nat;
  };

  let products = Map.empty<Nat, Product>();
  let reviews = Map.empty<Nat, Review>();
  let subscribedEmails = Map.empty<Text, Timestamp.Time>();
  let contactMessages = Map.empty<Nat, ContactMessage>();

  var nextProductId = 9;
  var nextReviewId = 4;
  var nextContactId = 1;

  public shared ({ caller }) func addProduct(product : NewProduct) : async Nat {
    let productId = nextProductId;
    products.add(
      productId,
      {
        product with
        id = productId;
      },
    );
    nextProductId += 1;
    productId;
  };

  public query ({ caller }) func getProducts() : async [Product] {
    products.values().toArray().sort();
  };

  public query ({ caller }) func getProductsByPrice() : async [Product] {
    products.values().toArray().sort(Product.compareByPrice);
  };

  public query ({ caller }) func findProductByName(name : Text) : async Product {
    let iter = products.values().toArray().values();
    switch (iter.find(func(p) { p.name.contains(#text name) })) {
      case (?product) { product };
      case (null) { Runtime.trap("No product containing name " # name # " found!") };
    };
  };

  public shared ({ caller }) func addReview(name : Text, productId : ?Nat, rating : Nat, content : Text) : async Nat {
    let reviewId = nextReviewId;
    reviews.add(
      reviewId,
      {
        id = reviewId;
        name;
        productId;
        rating;
        content;
        createdAt = Timestamp.now();
      },
    );
    nextReviewId += 1;
    reviewId;
  };

  public query ({ caller }) func getReviews() : async [Review] {
    reviews.values().toArray().sort();
  };

  public query ({ caller }) func getProductReviews(productId : Nat) : async [Review] {
    let iter = reviews.values().toArray().values();
    iter.filter(func(r) { r.productId == ?productId }).toArray().sort();
  };

  public shared ({ caller }) func subscribeEmail(email : Text) : async () {
    if (email.trim(#char ' ').size() == 0) {
      Runtime.trap("Cannot subscribe empty email!");
    };
    subscribedEmails.add(email, Timestamp.now());
  };

  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async Nat {
    let id = nextContactId;
    contactMessages.add(
      id,
      {
        id;
        name;
        email;
        message;
        createdAt = Timestamp.now();
      },
    );
    nextContactId += 1;
    id;
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.values().toArray().sort();
  };

  // SEED DATA
  public shared ({ caller }) func seedData() : async () {
    // Products
    products.add(
      1,
      {
        id = 1;
        name = "Mini Chunky Tote";
        description = "Adorable mini chunky handbags in brown, blue, and cream. Perfect for everyday essentials!";
        priceCents = 4000;
        category = #bags;
        images = [
          "mini_chunky_bag_1.jpg",
          "mini_chunky_bag_2.jpg",
        ];
        sizes = ["One Size"];
        colors = ["Brown", "Blue", "Cream"];
        stock = 10;
      },
    );
    products.add(
      2,
      {
        id = 2;
        name = "Chunky Bag";
        description = "Statement chunky bags in brown and green. Your new favorite accessory!";
        priceCents = 6000;
        category = #bags;
        images = [
          "chunky_bag_1.jpg",
          "chunky_bag_2.jpg",
        ];
        sizes = ["One Size"];
        colors = ["Brown", "Green"];
        stock = 8;
      },
    );
    products.add(
      3,
      {
        id = 3;
        name = "Chunky Shoulders Puffed";
        description = "Fluffy pastel bags. So trendy and fun!";
        priceCents = 9000;
        category = #bags;
        images = [
          "chunky_shoulders_1.jpg",
        ];
        sizes = ["One Size"];
        colors = ["Pastel"];
        stock = 9;
      },
    );
    products.add(
      4,
      {
        id = 4;
        name = "Crochet Earrings";
        description = "Handmade crochet earrings. A cute addition to any outfit!";
        priceCents = 2000;
        category = #accessories;
        images = [
          "crochet_earrings_1.jpg",
          "crochet_earrings_2.jpg",
        ];
        sizes = ["One Size"];
        colors = ["Multicolor"];
        stock = 15;
      },
    );
    products.add(
      5,
      {
        id = 5;
        name = "Custom Flower Bag";
        description = "Beautiful custom flower bag. A true statement piece!";
        priceCents = 8000;
        category = #bags;
        images = [
          "flower_bag_1.jpg",
        ];
        sizes = ["One Size"];
        colors = ["Blue"];
        stock = 2;
      },
    );
    products.add(
      6,
      {
        id = 6;
        name = "LED Heart Bag";
        description = "Show-stopping LED heart bag. Perfect for night outs!";
        priceCents = 5600;
        category = #bags;
        images = [
          "led_heart_bag_1.jpg",
        ];
        sizes = ["One Size"];
        colors = ["Pink"];
        stock = 3;
      },
    );
    products.add(
      7,
      {
        id = 7;
        name = "Custom Birch Shoulder Bag";
        description = "Unique custom shoulder bag. Your new favorite!";
        priceCents = 9000;
        category = #customOrders;
        images = [
          "custom_birch_shoulder_bag_1.jpg",
        ];
        sizes = ["One Size"];
        colors = ["Green"];
        stock = 2;
      },
    );
    products.add(
      8,
      {
        id = 8;
        name = "Custom Pink Bag";
        description = "Stylish custom pink bag for any occasion.";
        priceCents = 6700;
        category = #customOrders;
        images = [
          "custom_pink_bag_1.jpg",
        ];
        sizes = ["One Size"];
        colors = ["Pink"];
        stock = 2;
      },
    );

    // Reviews
    reviews.add(
      1,
      {
        id = 1;
        name = "Elisa";
        productId = ?2;
        rating = 5;
        content = "The chunky bag is beautiful! Great quality and super cute. Highly recommend!";
        createdAt = Timestamp.now() - 10_000_000_000;
      },
    );
    reviews.add(
      2,
      {
        id = 2;
        name = "John";
        productId = ?6;
        rating = 4;
        content = "The LED Heart bag is amazing! I get so many compliments on it. Love it!";
        createdAt = Timestamp.now() - 5_000_000_000;
      },
    );
    reviews.add(
      3,
      {
        id = 3;
        name = "Sophie";
        productId = null;
        rating = 5;
        content = "I love this shop! Amazing crochet pieces and super friendly owner!";
        createdAt = Timestamp.now() - 3_000_000_000;
      },
    );
  };
};
