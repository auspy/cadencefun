---
Lesson 8 - Refactoring Create Knight
---

let's refactor

```jsx
access(all) event KinigtMinted(id:UInt64)
```

```jsx
access(all) fun createKnight(): @NFT {
    var newNFT <- create NFT()
    emit KinigtMinted(id:self.totalSupply)
    return <- newNFT
}
```

### **Explanation:**

### **Putting it to the Test:**

### Solution !!
