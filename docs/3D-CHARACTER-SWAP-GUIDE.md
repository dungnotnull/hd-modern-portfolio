# 3D Character Swap Guide

How to replace the 3D character model while preserving all behaviors (mouse head tracking, animations, scroll interactions, lighting).

---

## 1. Model Requirements

Your new model must be a **GLTF/GLB file** (binary `.glb` recommended). It should be:

- Rigged with an armature (skeleton bones) for animations
- Draco-compressed (optional but recommended for smaller file size)
- Humanoid or similar proportions for the existing camera angles

### Required Animation Clips

The codebase expects these animation clip names:

| Clip Name | Purpose | Required? |
|-----------|---------|-----------|
| `introAnimation` | Played once on load (intro pose) | Yes |
| `key1` | Looping idle animation | Yes |
| `key2` | Looping idle animation | Yes |
| `key5` | Looping idle animation | Yes |
| `key6` | Looping idle animation | Yes |
| `typing` | Typing animation (filtered to hand/arm bones) | Yes |
| `Blink` | Eye blink animation, fades in after intro | Yes |
| `browup` | Eyebrow raise on hover (filtered to eyebrow bones) | Recommended |

If your model has different clip names, remap them in `src/components/Character/utils/animationUtils.ts` (lines 9-26 and 43).

### Required Bone Names

The code references specific bones by name:

- **`spine006`** - Head bone for mouse tracking (`Scene.tsx:64`)
- **`spine005`** - Neck bone for scroll-driven rotation (`GsapScroll.ts:55`)
- **`eyebrow_L` / `eyebrow_R`** - Eyebrow bones for hover effect
- **`footL` / `footR`** - Foot position adjustment
- **Typing bones** - Full list in `src/data/boneData.ts`

If your new model uses different bone names, update the references in:
- `src/components/Character/Scene.tsx` (line 64: `spine006`)
- `src/components/utils/GsapScroll.ts` (line 55: `spine005`)
- `src/data/boneData.ts` (all bone name arrays)
- `src/components/Character/utils/character.ts` (lines 35-38: `footR`, `footL`)

### Required Mesh Names

- **`Plane004`** - Monitor/screen mesh (child `Material.027` for screen display)
- **`screenlight`** - Emissive mesh for screen glow effect

If your model doesn't have a monitor/screen, remove the monitor-related code in `GsapScroll.ts` (lines 33-55, 96-110).

---

## 2. Step-by-Step Swap Process

### Step 1: Prepare Your Model

1. Open your model in Blender
2. Ensure it has the required animation clips listed above
3. Rename animations in Blender's NLA Editor or Action Editor if needed

### Step 2: Export to GLB

1. In Blender: File > Export > glTF 2.0 (.glb)
2. Enable these export settings:
   - Include: Meshes, Armature, Animations
   - Geometry: Apply modifiers
   - Compression: Draco (optional, requires Draco decoder at `/public/draco/`)
3. Save as `character.glb`

### Step 3: Replace the File

```
public/models/character.glb       <-- Replace this file
public/models/char_enviorment.hdr <-- Environment map (optional, can keep existing)
public/draco/                     <-- Draco decoder files (keep as-is if using Draco)
```

### Step 4: Adjust Bone Names (if needed)

1. Open the GLB in a viewer like [gltf-viewer](https://gltf-viewer.donmccurdy.com/)
2. Inspect the scene graph to find bone names
3. Update `spine006` in `Scene.tsx:64` to match your head bone
4. Update `spine005` in `GsapScroll.ts:55` to match your neck bone
5. Update typing bone names in `src/data/boneData.ts`

### Step 5: Adjust Camera (if needed)

If your model is taller/shorter/wider, adjust in `Scene.tsx:42-44`:

```typescript
camera.position.set(0, 13.1, 24.7); // Y = height, Z = distance
camera.zoom = 1.1;                   // Zoom level
```

And in `GsapScroll.ts:63`:
```typescript
.to(camera.position, { z: 22 }, 0) // Scroll zoom distance
```

### Step 6: Test

1. Run `npm run dev`
2. Check the loading animation plays correctly
3. Verify mouse head tracking works (move mouse around, head should follow)
4. Scroll through all sections - character should rotate, zoom, and fade out
5. Hover over the character face - eyebrow raise should trigger

---

## 3. Where Each Behavior Lives

| Behavior | File | Function/Line |
|----------|------|---------------|
| Mouse head tracking | `Character/utils/mouseUtils.ts` | `handleHeadRotation()` |
| Head bone reference | `Character/Scene.tsx` | Line 64: `spine006` |
| Scroll rotation | `utils/GsapScroll.ts` | `tl1` timeline |
| Scroll zoom | `utils/GsapScroll.ts` | Camera position z/y |
| Typing animation | `Character/utils/animationUtils.ts` | Lines 27-33 |
| Blink animation | `Character/utils/animationUtils.ts` | Line 44 |
| Eyebrow hover | `Character/utils/animationUtils.ts` | `hover()` |
| Screen glow | `utils/GsapScroll.ts` | `screenlight` mesh |
| Character fade-out | `utils/GsapScroll.ts` | `tl4` timeline |
| Intro animation | `Character/utils/animationUtils.ts` | `startIntro()` |
| Lighting | `Character/utils/lighting.ts` | HDR env + lights |
| Foot position | `Character/utils/character.ts` | Lines 35-38 |
| Model loading | `Character/utils/character.ts` | `loadCharacter()` |

---

## 4. Free Character Model Sources

| Source | URL | Notes |
|--------|-----|-------|
| Mixamo | https://www.mixamo.com | Free Adobe characters, auto-rigged, many animations |
| Ready Player Me | https://readyplayer.me | Customizable avatars, glTF export |
| Sketchfab | https://sketchfab.com | Search "rigged character gltf", filter by free |

### Mixamo Workflow (Recommended)

1. Go to Mixamo, select a character
2. Download each required animation as FBX
3. In Blender: File > Import > FBX for each animation
4. Assign each animation to an NLA track with the correct clip name
5. Export as GLB

---

## 5. Troubleshooting

**Model doesn't appear:**
- Check browser console for GLTF loading errors
- Verify the file path is `/models/character.glb`
- Ensure Draco decoder exists at `/public/draco/` if model is Draco-compressed

**Animations don't play:**
- Check console for "Animation not found" errors
- Verify clip names match exactly (case-sensitive)
- Open the GLB in a viewer to confirm animations are included

**Head tracking doesn't work:**
- The bone name `spine006` must exist in your model
- Update `Scene.tsx:64` to match your model's head bone name
- The bone must be part of the armature, not a separate object

**Model clips through floor or floats:**
- Adjust `footR`/`footL` Y position in `character.ts:37-38`
- Or adjust camera height in `Scene.tsx:42`

**Screen glow doesn't work:**
- Your model needs a mesh named `screenlight` with an emissive material
- If your model doesn't have this, remove the screenlight code in `GsapScroll.ts`
