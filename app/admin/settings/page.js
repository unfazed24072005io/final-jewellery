'use client';

import { 
  FiSave, 
  FiGlobe, 
  FiCreditCard, 
  FiMail, 
  FiTruck,
  FiShield,
  FiImage,
  FiUsers,
  FiBell,
  FiLock
} from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    store: {
      name: 'Luxury Jewels',
      email: 'contact@luxuryjewels.com',
      phone: '+1 (555) 123-4567',
      address: '123 Luxury Avenue, Diamond District, NY 10001',
      currency: 'USD',
      timezone: 'America/New_York'
    },
    shipping: {
      freeShippingThreshold: 500,
      domesticRate: 25,
      internationalRate: 75,
      processingTime: '2-3 business days'
    },
    payment: {
      stripeEnabled: true,
      paypalEnabled: true,
      bankTransferEnabled: false,
      cashOnDelivery: false
    },
    notifications: {
      newOrder: true,
      newCustomer: true,
      lowStock: true,
      newsletterSignup: false
    },
    security: {
      requireLogin: false,
      twoFactorAuth: false,
      sessionTimeout: 30
    }
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    // Simulate loading settings
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    setSaving(true);
    setSaveMessage('');
    
    // Simulate API call
    setTimeout(() => {
      console.log('Settings saved:', settings);
      setSaving(false);
      setSaveMessage('Settings saved successfully!');
      
      setTimeout(() => {
        setSaveMessage('');
      }, 3000);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="loading-spinner w-12 h-12 border-4 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-2">Configure your store settings</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="admin-btn-primary inline-flex items-center"
        >
          {saving ? (
            <>
              <div className="loading-spinner w-4 h-4 border-2 mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <FiSave className="mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {saveMessage && (
        <div className="admin-alert admin-alert-success">
          {saveMessage}
        </div>
      )}

      {/* Settings Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Store Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* General Settings */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="flex items-center">
                <FiGlobe className="text-gold mr-3" size={20} />
                <h3 className="admin-card-title">General Settings</h3>
              </div>
            </div>
            <div className="space-y-6">
              <div className="admin-form-group">
                <label className="admin-form-label">Store Name</label>
                <input
                  type="text"
                  value={settings.store.name}
                  onChange={(e) => handleChange('store', 'name', e.target.value)}
                  className="admin-form-input"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">Contact Email</label>
                  <input
                    type="email"
                    value={settings.store.email}
                    onChange={(e) => handleChange('store', 'email', e.target.value)}
                    className="admin-form-input"
                  />
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label">Phone Number</label>
                  <input
                    type="text"
                    value={settings.store.phone}
                    onChange={(e) => handleChange('store', 'phone', e.target.value)}
                    className="admin-form-input"
                  />
                </div>
              </div>
              
              <div className="admin-form-group">
                <label className="admin-form-label">Store Address</label>
                <textarea
                  value={settings.store.address}
                  onChange={(e) => handleChange('store', 'address', e.target.value)}
                  className="admin-form-input h-24"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">Currency</label>
                  <select
                    value={settings.store.currency}
                    onChange={(e) => handleChange('store', 'currency', e.target.value)}
                    className="admin-form-input"
                  >
                    <option value="USD">US Dollar (USD)</option>
                    <option value="EUR">Euro (EUR)</option>
                    <option value="GBP">British Pound (GBP)</option>
                    <option value="CAD">Canadian Dollar (CAD)</option>
                    <option value="AUD">Australian Dollar (AUD)</option>
                  </select>
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label">Timezone</label>
                  <select
                    value={settings.store.timezone}
                    onChange={(e) => handleChange('store', 'timezone', e.target.value)}
                    className="admin-form-input"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="Europe/London">London (GMT)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Settings */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="flex items-center">
                <FiTruck className="text-blue-500 mr-3" size={20} />
                <h3 className="admin-card-title">Shipping Settings</h3>
              </div>
            </div>
            <div className="space-y-6">
              <div className="admin-form-group">
                <label className="admin-form-label">Free Shipping Threshold</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={settings.shipping.freeShippingThreshold}
                    onChange={(e) => handleChange('shipping', 'freeShippingThreshold', parseInt(e.target.value) || 0)}
                    className="admin-form-input pl-8"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="admin-form-group">
                  <label className="admin-form-label">Domestic Shipping Rate</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={settings.shipping.domesticRate}
                      onChange={(e) => handleChange('shipping', 'domesticRate', parseInt(e.target.value) || 0)}
                      className="admin-form-input pl-8"
                    />
                  </div>
                </div>
                
                <div className="admin-form-group">
                  <label className="admin-form-label">International Shipping Rate</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={settings.shipping.internationalRate}
                      onChange={(e) => handleChange('shipping', 'internationalRate', parseInt(e.target.value) || 0)}
                      className="admin-form-input pl-8"
                    />
                  </div>
                </div>
              </div>
              
              <div className="admin-form-group">
                <label className="admin-form-label">Order Processing Time</label>
                <input
                  type="text"
                  value={settings.shipping.processingTime}
                  onChange={(e) => handleChange('shipping', 'processingTime', e.target.value)}
                  className="admin-form-input"
                  placeholder="e.g., 2-3 business days"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-8">
          {/* Payment Methods */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="flex items-center">
                <FiCreditCard className="text-green-500 mr-3" size={20} />
                <h3 className="admin-card-title">Payment Methods</h3>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'stripeEnabled', label: 'Stripe', icon: FiCreditCard },
                { key: 'paypalEnabled', label: 'PayPal', icon: FiCreditCard },
                { key: 'bankTransferEnabled', label: 'Bank Transfer', icon: FiCreditCard },
                { key: 'cashOnDelivery', label: 'Cash on Delivery', icon: FiCreditCard }
              ].map((method) => (
                <div key={method.key} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <method.icon className="text-gray-400 mr-3" size={16} />
                    <span className="text-sm text-gray-700">{method.label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.payment[method.key]}
                      onChange={(e) => handleChange('payment', method.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="flex items-center">
                <FiBell className="text-purple-500 mr-3" size={20} />
                <h3 className="admin-card-title">Notifications</h3>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { key: 'newOrder', label: 'New Orders', icon: FiBell },
                { key: 'newCustomer', label: 'New Customers', icon: FiUsers },
                { key: 'lowStock', label: 'Low Stock Alerts', icon: FiBell },
                { key: 'newsletterSignup', label: 'Newsletter Signups', icon: FiMail }
              ].map((notif) => (
                <div key={notif.key} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <notif.icon className="text-gray-400 mr-3" size={16} />
                    <span className="text-sm text-gray-700">{notif.label}</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.notifications[notif.key]}
                      onChange={(e) => handleChange('notifications', notif.key, e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Security */}
          <div className="admin-card">
            <div className="admin-card-header">
              <div className="flex items-center">
                <FiShield className="text-red-500 mr-3" size={20} />
                <h3 className="admin-card-title">Security</h3>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiLock className="text-gray-400 mr-3" size={16} />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Require Login</div>
                    <div className="text-xs text-gray-500">Force users to login</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.requireLogin}
                    onChange={(e) => handleChange('security', 'requireLogin', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiShield className="text-gray-400 mr-3" size={16} />
                  <div>
                    <div className="text-sm font-medium text-gray-700">Two-Factor Auth</div>
                    <div className="text-xs text-gray-500">Extra security layer</div>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => handleChange('security', 'twoFactorAuth', e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                </label>
              </div>
              
              <div className="admin-form-group">
                <label className="admin-form-label">Session Timeout (minutes)</label>
                <input
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleChange('security', 'sessionTimeout', parseInt(e.target.value) || 0)}
                  className="admin-form-input"
                  min="5"
                  max="120"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}