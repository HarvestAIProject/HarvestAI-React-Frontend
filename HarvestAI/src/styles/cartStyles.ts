// src/styles/cartStyles.ts
import { StyleSheet } from 'react-native';

const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 8,
  },

  /* Top Bar */
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontFamily: 'InriaSerif-Bold',
  },

  /* Empty state */
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 18,
    fontFamily: 'InriaSerif-Bold',
    color: '#444',
  },
  emptySubtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  shopBtn: {
    marginTop: 16,
    backgroundColor: '#7BA890',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  shopBtnText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 14,
  },

  /* List */
  listContent: {
    paddingTop: 12,
    paddingBottom: 160, // space for sticky summary bar
  },

  /* Cart Item Card */
  card: {
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
    minHeight: 110,
    position: 'relative',
  },
  cardImage: {
    width: 110,
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  cardContent: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'InriaSerif-Bold',
    color: '#222',
    marginBottom: 4,
  },
  cardSubtitle: {
    color: '#7BA890',
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 8,
  },

  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  /* Quantity controls */
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  qtyButton: {
    padding: 6,
    borderRadius: 8,
  },
  qtyButtonDisabled: {
    opacity: 0.5,
  },
  qtyText: {
    minWidth: 28,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 14,
    color: '#333',
  },

  lineTotal: {
    fontWeight: '800',
    fontSize: 16,
    color: '#111',
  },

  removeBtn: {
    position: 'absolute',
    right: 8,
    top: 8,
    padding: 6,
    borderRadius: 8,
    backgroundColor: 'rgba(176, 0, 32, 0.06)',
  },

  /* Sticky Summary Bar */
  summaryBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    minHeight: 200,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#e5e5e5',
    marginVertical: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    color: '#111',
    fontWeight: '600',
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontFamily: 'InriaSerif-Bold',
    color: '#222',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontFamily: 'InriaSerif-Bold',
    color: '#111',
  },

  /* Checkout button */
  checkoutBtn: {
    marginTop: 12,
    backgroundColor: '#7BA890',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  checkoutBtnDisabled: {
    backgroundColor: '#dfe3e6',
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
    marginRight: 6,
  },
  checkoutTextDisabled: {
    color: '#cfcfcf',
  },
});

export default cartStyles;
