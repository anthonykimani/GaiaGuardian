# 🐘 Manny: BIOFI Project

🚀 **Leveraging AI Agents for Elephant Conservation & Donor Engagement**

Manny is an innovative **Wildlife Conservation project** that combines the **Eliza AI Agent framework**, **NFTs**, and **3D visualization** to create immersive experiences for adopters of orphaned elephants through the **Sheldrick Wildlife Trust**. 🏕️ The project enables AI agents to autonomously manage donor interactions, mint NFTs, generate social updates, and provide **3D representations** of adopted elephants, fostering deeper emotional connections between donors and wildlife. 🌍🐘✨

---

## 🏗️ **Technical Architecture**
### 🤖 **1. AI Agents Powered by Eliza**
- **Autonomous Representation**: Each adopted elephant is represented by an **Eliza AI agent** that simulates its personality, history, and behavioral patterns using **retrieval-augmented generation (RAG)** for context-aware interactions. 💬
- **Multi-Platform Integration**: Agents connect to **Twitter/X** to post updates (e.g., growth milestones, habitat activities) and interact with donors via natural language, mimicking real-time communication. 📲
- **Character Files**: Agents are configured through **JSON character files**, defining traits like _"playfulness"_ or _"favorite foods,"_ and linking to blockchain wallets for transactions. 💰

### 🔗 **2. Blockchain & NFTs on Base Sepolia**
- **NFT Minting**: Using **Coinbase’s AgentKit plugin** integrated into Eliza, agents autonomously mint **dynamic NFTs** on **Base Sepolia** for adopters. These NFTs evolve with the elephant’s growth (e.g., adding milestones like "first mud bath"). 🎨🐘
- **Transaction Automation**: Agents execute on-chain actions (e.g., processing donations, transferring NFT ownership) via pre-configured workflows in **AgentKit**, ensuring transparency and auditability. 🔍
- **Gas Optimization**: Base Sepolia’s low-cost environment ensures affordable microtransactions for global donors. 🌎💸

### 🎭 **3D Visualization with React Three**
- **Interactive Models**: React Three renders lifelike **3D models** of elephants, allowing donors to rotate, zoom, and observe their adopted elephant’s movements in real-time. 🎥
- **Emotional Engagement**: The **3D interface** provides a spatial dimension to donor interactions, enabling virtual "visits" to the elephant’s habitat. Features include:
  - 🕒 **Time-lapse Growth**: Visualize the elephant’s development from rescue to adulthood.
  - ☔ **Environmental Context**: Overlay weather data or habitat changes (e.g., rainy season effects).
  - 📱 **AR Integration**: Donors can project the **3D model** into their physical space via mobile devices, deepening emotional bonds.

---



