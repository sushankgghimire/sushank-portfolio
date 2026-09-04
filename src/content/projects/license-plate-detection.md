---
title: Automatic License Plate Detection
tagline: YOLO based detection of plates and the characters on them, wrapped in a web app
category: ai
featured: true
order: 2
year: 2023
stack: [Python, YOLO, OpenCV, PyTorch, Django]
links:
  repo: https://github.com/pratigya2/Automatic-License-Plate-Detection/
cover: ../../assets/projects/lp.png
coverAlt: License plate detection project by Sushank Ghimire, bounding boxes drawn around a vehicle plate
metrics:
  - { value: 'Two stage', label: 'plate then characters' }
  - { value: 'Upload to result', label: 'complete workflow' }
---

A two-stage computer vision pipeline. The first YOLO model finds the license plate in a photo or video frame. The second reads the characters on the cropped plate. The web app takes an upload and returns the plate number with the detections drawn on the image.

## Notes

- Nepali plates use Devanagari characters, which meant building our own labelled dataset rather than reusing a Latin-alphabet OCR model.
- Detecting characters as objects (rather than running classical OCR) handled skew, glare and low resolution far better than we expected.
- The Django frontend was deliberately simple: one upload form, one results page, so the model was the thing on display.
