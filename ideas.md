# GeoAtlas 设计构思

## 1. 极简主义 (Minimalist) - "Swiss Style"
<response>
<text>
**Design Movement**: Swiss Style (International Typographic Style)
**Core Principles**: 清晰、客观、网格系统、无衬线字体。强调内容本身，去除一切装饰性元素。
**Color Philosophy**: "Data First"。背景使用纯白或极浅的灰白 (#F5F5F7)，行政区划使用高对比度的单色线条（深灰 #333），选中区域使用克制的强调色（如瑞士红 #FF4B4B 或 国际蓝 #0052CC）。颜色的作用是区分层级，而非装饰。
**Layout Paradigm**: 非对称布局。左侧为宽大的地图交互区，右侧或悬浮层为结构化的信息面板。利用空白来引导视线。
**Signature Elements**:
1.  **极细的边框线**：1px 或 0.5px 的矢量线条，锐利清晰。
2.  **粗体无衬线标题**：使用 Helvetica 或 Inter，大字号，高对比度。
3.  **卡片式信息层**：信息面板悬浮于地图之上，带有轻微的阴影，保持层级感。
**Interaction Philosophy**: "Direct Manipulation"。点击即反馈，过渡动画极快（<200ms），强调效率。
**Animation**: 只有必要的层级切换动画（Zoom in/out），无多余的缓动或弹性效果。
**Typography System**: Inter 或 Helvetica Now。标题使用 Bold/Black，正文使用 Regular。严格的字号层级。
</text>
<probability>0.05</probability>
</response>

## 2. 暗色科技 (Dark Tech) - "Cyberpunk Lite"
<response>
<text>
**Design Movement**: Cyberpunk / HUD (Heads-Up Display)
**Core Principles**: 数据可视化、发光效果、高科技感。强调数据的深度和复杂的空间结构。
**Color Philosophy**: "Neon in the Dark"。背景为深邃的蓝黑 (#0A0E14)，地图轮廓使用青色 (#00F0FF) 或 琥珀色 (#FFB300) 的发光线条。未选中区域暗淡，选中区域高亮发光。
**Layout Paradigm**: 沉浸式全屏。地图占据整个屏幕，UI 元素作为 HUD 覆盖在四周。
**Signature Elements**:
1.  **发光路径**：SVG 路径带有 `drop-shadow` 或 `filter: glow`。
2.  **半透明磨砂玻璃**：UI 面板使用深色玻璃拟态 (Glassmorphism)。
3.  **单色数据点**：POI 使用发光的小圆点或十字准星。
**Interaction Philosophy**: "Exploration"。鼠标悬停时有扫描线或高亮效果，点击时有类似电路接通的反馈。
**Animation**: 缓慢而流畅的平移和缩放，带有惯性。层级切换时有类似全息投影展开的效果。
**Typography System**: JetBrains Mono 或 Roboto Mono（等宽字体），配合 Rajdhani。营造代码或终端的感觉。
</text>
<probability>0.03</probability>
</response>

## 3. 纸质地图 (Paper Map) - "Cartographic Heritage"
<response>
<text>
**Design Movement**: Classic Cartography / Print Design
**Core Principles**: 质感、人文、温暖。模仿传统纸质地图的触感和视觉体验，但结合现代交互。
**Color Philosophy**: "Earth Tones"。背景使用米色或羊皮纸色 (#FDFBF7)，行政区划使用柔和的粉彩（淡蓝、淡绿、淡黄）区分，边界线使用深棕色 (#4A3B32) 而非纯黑。
**Layout Paradigm**: 经典的图例布局。地图居中，四周有装饰性的边框或刻度，信息面板像书页一样从侧面滑出。
**Signature Elements**:
1.  **纹理背景**：轻微的纸张纹理噪点。
2.  **衬线字体**：标题使用优雅的衬线体（如 Merriweather 或 Playfair Display）。
3.  **水彩质感**：选中区域有类似水彩晕染的效果。
**Interaction Philosophy**: "Reading"。交互节奏舒缓，像翻阅地图册一样。
**Animation**: 页面翻转或淡入淡出，模拟纸张的物理特性。
**Typography System**: Playfair Display (标题) + Lato (正文)。经典且易读。
</text>
<probability>0.02</probability>
</response>

---

## 选定方案：极简主义 (Minimalist) - "Swiss Style"

**理由**：
用户的核心需求是“理解空间结构”和“认知”，而非娱乐或沉浸式体验。
1.  **清晰度最高**：Swiss Style 强调客观和清晰，最能突出行政区划的轮廓，符合“轮廓清晰、颜色克制”的产品要求。
2.  **干扰最少**：去除装饰性元素，让用户专注于地理关系本身。
3.  **符合“极简静态地图工具”定位**：产品定位明确指出是“极简”，Swiss Style 是极简主义的代表。
4.  **易于扩展**：清晰的网格和排版系统方便未来增加更多层级或数据，而不会显得杂乱。

我们将采用 **Swiss Style**，使用高对比度的黑白灰为主色调，辅以一种克制的强调色（如 **国际蓝 #0052CC**），配合 **Inter** 字体，打造一个专业、冷静、高效的地理认知工具。
