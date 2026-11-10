/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MenuPage } from './components/MenuPage';

export default function App() {
  const [menuPageOpen, setMenuPageOpen] = useState(false);

  // Check URL hash on load / change
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#menu-page' || window.location.hash === '#full-menu') {
        setMenuPageOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Global click interception
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Menu page triggers
      const menuPageTrigger = target.closest('[data-open-menu-page], a[href="#menu-page"], a[href="#full-menu"]');
      if (menuPageTrigger) {
        e.preventDefault();
        setMenuPageOpen(true);
        return;
      }

      // Smooth scroll navigation
      const navLink = target.closest('a[href^="#"]');
      if (navLink) {
        const hash = (navLink as HTMLAnchorElement).getAttribute('href');
        if (hash && hash !== '#') {
          const targetEl = document.querySelector(hash);
          if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            const navMenu = document.querySelector('.navbar_menu, .w-nav-menu');
            if (navMenu) {
              navMenu.classList.remove('is-opened');
              (navMenu as HTMLElement).style.display = '';
            }
          }
        }
      }

      // Mobile hamburger button
      const mobileNavBtn = target.closest('.mobile-nav-button');
      if (mobileNavBtn) {
        const navMenu = document.querySelector('.navbar_menu, .w-nav-menu');
        if (navMenu) {
          const isOpened = navMenu.classList.contains('is-opened');
          if (isOpened) {
            navMenu.classList.remove('is-opened');
            (navMenu as HTMLElement).style.display = 'none';
          } else {
            navMenu.classList.add('is-opened');
            (navMenu as HTMLElement).style.display = 'block';
          }
        }
      }
    };

    document.addEventListener('click', handleGlobalClick);

    // Ensure all Webflow animation triggers reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translate3d(0, 0, 0) scale3d(1, 1, 1)';
          el.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-w-id]').forEach(el => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.style.opacity === '0') {
        observer.observe(htmlEl);
      }
    });

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      observer.disconnect();
    };
  }, []);

  // Interactive 3D movement and mouse parallax on Bahawalpur map
  useEffect(() => {
    const mapBlock = document.querySelector('.custom_map-map_block') as HTMLElement | null;
    const mapImg = document.querySelector('.bwp-animated-map') as HTMLElement | null;
    if (!mapBlock || !mapImg) return;

    let isHovering = false;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isHovering) return;
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = mapBlock.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -9;
        const rotateY = ((x - centerX) / centerX) * 9;
        mapImg.style.transform = `perspective(1200px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;
      });
    };

    const handleMouseEnter = () => {
      isHovering = true;
      mapImg.style.animationPlayState = 'paused';
      mapImg.style.transition = 'transform 0.12s cubic-bezier(0.2, 0.8, 0.4, 1)';
    };

    const handleMouseLeave = () => {
      isHovering = false;
      if (rafId) cancelAnimationFrame(rafId);
      mapImg.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
      mapImg.style.transform = '';
      setTimeout(() => {
        if (!isHovering) {
          mapImg.style.animationPlayState = 'running';
        }
      }, 600);
    };

    mapBlock.addEventListener('mouseenter', handleMouseEnter);
    mapBlock.addEventListener('mousemove', handleMouseMove);
    mapBlock.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      mapBlock.removeEventListener('mouseenter', handleMouseEnter);
      mapBlock.removeEventListener('mousemove', handleMouseMove);
      mapBlock.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* DEDICATED MENU PAGE OVERLAY */}
      <MenuPage
        isOpen={menuPageOpen}
        onClose={() => setMenuPageOpen(false)}
      />
    </>
  );
}
