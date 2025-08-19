// src/styles/productStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 56,
    paddingHorizontal: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  backButton: { padding: 8 },

  scrollBody: { paddingBottom: 28 },

  /* Gallery */
  galleryWrap: { backgroundColor: '#fff' },
  heroImage: { height: 360, backgroundColor: '#fff' },
  imageFallback: {
    height: 360,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f4f6',
  },
  pagerOverlay: {
    position: 'absolute',
    bottom: 8,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(17,17,17,0.04)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pagerArrow: { fontSize: 18, color: '#444' },
  pagerText: { fontSize: 12, color: '#444' },

  /* Meta */
  metaBlock: { paddingHorizontal: 16, paddingTop: 12 },
  brandLabel: {
    fontSize: 12,
    letterSpacing: 1.4,
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  title: {
    fontSize: 24,
    fontFamily: 'InriaSerif-Bold',
    color: '#111827',
    marginBottom: 6,
  },
  priceText: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 14,
  },

  /* Quantity */
  qtyBlock: {
    paddingHorizontal: 16,
    paddingTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: { fontSize: 14, color: '#6b7280' },
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  qtyBtn: { padding: 6, borderRadius: 8 },
  qtyBtnDisabled: { opacity: 0.5 },
  qtyText: {
    minWidth: 28,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    color: '#333',
  },

  /* Total row */
  totalRow: {
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: { color: '#6b7280' },
  totalValue: { fontFamily: 'InriaSerif-Bold', color: '#111', fontSize: 16 },

  /* CTAs */
  addToCartBtn: {
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#111',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: { color: '#111', fontWeight: '700' },

  buyNowBtn: {
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: '#7BA890',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buyNowText: { color: '#fff', fontWeight: '800' },

  /* Description */
  descText: { color: '#4b5563', lineHeight: 20, marginTop: 6, paddingRight: 4, paddingBottom: 10 },
});
