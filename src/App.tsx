/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

export default function App() {
  // Global click interception and interactions
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Smooth scroll navigation
      const navLink = target.closest('a[href^="#"]');
      if (navLink) {
        const hash = (navLink as HTMLAnchorElement).getAttribute('href');

        // Check if inside muffins-sweets-bakers page or papas-kitchen page
        const insideSweetsPage = target.closest('#muffins-sweets-bakers-page');
        const insidePapasKitchen = target.closest('#papas-kitchen-page');
        if (insideSweetsPage || insidePapasKitchen) {
          // Let internal brand router handle its own hash and buttons
          return;
        }

        if (hash === '#muffins-cafe-grill' || (navLink as HTMLAnchorElement).getAttribute('onclick')?.includes('openCafeGrillView')) {
          e.preventDefault();
          (window as any).openCafeGrillView?.(e);
          // Close mobile menu if open
          const navMenu = document.querySelector('.navbar_menu, .w-nav-menu');
          if (navMenu) {
            navMenu.classList.remove('is-opened');
            (navMenu as HTMLElement).style.display = '';
          }
          return;
        }

        if (hash === '#muffins-sweets-bakers' || (navLink as HTMLAnchorElement).getAttribute('onclick')?.includes('openSweetsBakersView')) {
          e.preventDefault();
          (window as any).openSweetsBakersView?.(e);
          // Close mobile menu if open
          const navMenu = document.querySelector('.navbar_menu, .w-nav-menu');
          if (navMenu) {
            navMenu.classList.remove('is-opened');
            (navMenu as HTMLElement).style.display = '';
          }
          return;
        }

        if (hash === '#papas-kitchen' || hash?.startsWith('#papas-kitchen') || (navLink as HTMLAnchorElement).getAttribute('onclick')?.includes('openPapasKitchenView')) {
          e.preventDefault();
          (window as any).openPapasKitchenView?.(e);
          // Close mobile menu if open
          const navMenu = document.querySelector('.navbar_menu, .w-nav-menu');
          if (navMenu) {
            navMenu.classList.remove('is-opened');
            (navMenu as HTMLElement).style.display = '';
          }
          return;
        }

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

      // Mobile dropdown accordion toggle
      const dropdownToggle = target.closest('.navbar_dropdown-toggle');
      if (dropdownToggle && window.innerWidth < 992) {
        const dropdownParent = dropdownToggle.closest('.navbar_dropdown-link');
        const dropdownContent = dropdownParent?.querySelector('.navbar_dropdown-content') as HTMLElement | null;
        if (dropdownContent) {
          const isCurrentlyOpen = dropdownContent.style.display === 'flex' || dropdownContent.classList.contains('w--open');
          if (isCurrentlyOpen) {
            dropdownContent.classList.remove('w--open');
            dropdownContent.style.display = 'none';
          } else {
            dropdownContent.classList.add('w--open');
            dropdownContent.style.display = 'flex';
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

  // Interactive 3D movement and mouse parallax on Muffins Sweets & Bakers hero muffin
  useEffect(() => {
    let isHovering = false;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const heroStage = document.querySelector('#muffins-sweets-bakers-page .hero-stage') as HTMLElement | null;
      const heroPhoto = document.querySelector('#muffins-sweets-bakers-page .hero-photo') as HTMLElement | null;
      if (!heroStage || !heroPhoto || !isHovering) return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = heroStage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -14;
        const rotateY = ((x - centerX) / centerX) * 14;
        heroPhoto.style.transform = `translate3d(-50%, -10px, 35px) perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.04, 1.04, 1.04)`;
      });
    };

    const handleMouseEnter = () => {
      const heroPhoto = document.querySelector('#muffins-sweets-bakers-page .hero-photo') as HTMLElement | null;
      if (heroPhoto) {
        isHovering = true;
        heroPhoto.style.animationPlayState = 'paused';
        heroPhoto.style.transition = 'transform 0.12s cubic-bezier(0.2, 0.8, 0.4, 1), filter 0.3s ease';
      }
    };

    const handleMouseLeave = () => {
      const heroPhoto = document.querySelector('#muffins-sweets-bakers-page .hero-photo') as HTMLElement | null;
      isHovering = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (heroPhoto) {
        heroPhoto.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease';
        heroPhoto.style.transform = '';
        setTimeout(() => {
          if (!isHovering && heroPhoto) {
            heroPhoto.style.animationPlayState = 'running';
          }
        }, 600);
      }
    };

    const intervalId = setInterval(() => {
      const heroStage = document.querySelector('#muffins-sweets-bakers-page .hero-stage');
      if (heroStage && !(heroStage as any).__has3dListener) {
        (heroStage as any).__has3dListener = true;
        heroStage.addEventListener('mouseenter', handleMouseEnter as EventListener);
        heroStage.addEventListener('mousemove', handleMouseMove as EventListener);
        heroStage.addEventListener('mouseleave', handleMouseLeave as EventListener);
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Interactive 3D movement and mouse parallax on Muffins Sweets & Bakers celebration cake
  useEffect(() => {
    let isHovering = false;
    let rafId: number | null = null;

    const handleMouseMove = (e: MouseEvent) => {
      const visitWrap = document.querySelector('#muffins-sweets-bakers-page .visit .wrap') as HTMLElement | null;
      const cakeImg = document.querySelector('#muffins-sweets-bakers-page .visit-cake-img') as HTMLElement | null;
      if (!visitWrap || !cakeImg || !isHovering) return;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const rect = visitWrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -12;
        const rotateY = ((x - centerX) / centerX) * 12;
        cakeImg.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.05, 1.05, 1.05) translateY(-14px)`;
      });
    };

    const handleMouseEnter = () => {
      const cakeImg = document.querySelector('#muffins-sweets-bakers-page .visit-cake-img') as HTMLElement | null;
      if (cakeImg) {
        isHovering = true;
        cakeImg.style.animationPlayState = 'paused';
        cakeImg.style.transition = 'transform 0.12s cubic-bezier(0.2, 0.8, 0.4, 1), filter 0.3s ease';
      }
    };

    const handleMouseLeave = () => {
      const cakeImg = document.querySelector('#muffins-sweets-bakers-page .visit-cake-img') as HTMLElement | null;
      isHovering = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (cakeImg) {
        cakeImg.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease';
        cakeImg.style.transform = '';
        setTimeout(() => {
          if (!isHovering && cakeImg) {
            cakeImg.style.animationPlayState = 'running';
          }
        }, 600);
      }
    };

    const intervalId = setInterval(() => {
      const visitWrap = document.querySelector('#muffins-sweets-bakers-page .visit .wrap');
      if (visitWrap && !(visitWrap as any).__hasCake3dListener) {
        (visitWrap as any).__hasCake3dListener = true;
        visitWrap.addEventListener('mouseenter', handleMouseEnter as EventListener);
        visitWrap.addEventListener('mousemove', handleMouseMove as EventListener);
        visitWrap.addEventListener('mouseleave', handleMouseLeave as EventListener);
      }
    }, 500);

    return () => {
      clearInterval(intervalId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Interactive cursor parallax and 3D movement for Papa's Kitchen Standing Mascot Rooster before footer
  useEffect(() => {
    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;
    let targetRotY = 0;
    let targetRotX = 0;
    let currX = 0;
    let currY = 0;
    let currRotY = 0;
    let currRotX = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const mascot = document.getElementById('papas-standing-mascot') as HTMLElement | null;
      if (!mascot) return;
      const stage = mascot.closest('.papas-mascot-section-stage') as HTMLElement | null;
      if (!stage) return;

      const rect = stage.getBoundingClientRect();
      if (rect.bottom < -100 || rect.top > window.innerHeight + 100) return;

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height * 0.4;
      const dx = (e.clientX - centerX) / (window.innerWidth * 0.5);
      const dy = (e.clientY - centerY) / (window.innerHeight * 0.5);

      const clampX = Math.max(-1, Math.min(1, dx));
      const clampY = Math.max(-1, Math.min(1, dy));

      targetRotY = clampX * 10;
      targetRotX = clampY * -6;
      targetX = clampX * 12;
      targetY = clampY * 6;
    };

    const updateLoop = () => {
      const mascot = document.getElementById('papas-standing-mascot') as HTMLElement | null;
      const shadow = document.getElementById('papas-mascot-shadow') as HTMLElement | null;
      if (mascot) {
        currX += (targetX - currX) * 0.1;
        currY += (targetY - currY) * 0.1;
        currRotY += (targetRotY - currRotY) * 0.1;
        currRotX += (targetRotX - currRotX) * 0.1;

        mascot.style.transform = `perspective(1000px) translate3d(${currX.toFixed(2)}px, ${currY.toFixed(2)}px, 15px) rotateX(${currRotX.toFixed(2)}deg) rotateY(${currRotY.toFixed(2)}deg)`;
        if (shadow) {
          shadow.style.transform = `translate3d(${(-currX * 0.4).toFixed(2)}px, 0, 0) scale(${1 - Math.abs(currY) * 0.02})`;
        }
      }
      rafId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
