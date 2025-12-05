/**
 * Интерактивное пособие «Покраска автомобиля»
 * Управление 3D моделью автомобиля и выбором цвета
 */

// ============================================
// Конфигурация
// ============================================
const CONFIG = {
    // Базовые цвета (используются по умолчанию)
    presetColors: [
        { name: 'Красный', value: '#ff0000', code: 'A3B' },
        { name: 'Синий', value: '#0066cc', code: 'B4C' },
        { name: 'Черный', value: '#000000', code: 'C5D' },
        { name: 'Белый', value: '#ffffff', code: 'D6E' },
        { name: 'Серебристый', value: '#c0c0c0', code: 'E7F' },
        { name: 'Серый', value: '#808080', code: 'F8A' },
        { name: 'Зеленый', value: '#00cc00', code: 'A9B' },
        { name: 'Желтый', value: '#ffcc00', code: 'B0C' },
        { name: 'Оранжевый', value: '#ff6600', code: 'C1D' },
        { name: 'Фиолетовый', value: '#9933cc', code: 'D2E' },
        { name: 'Розовый', value: '#ff99cc', code: 'E3F' },
        { name: 'Коричневый', value: '#663300', code: 'F4A' }
    ],
    // Коды красок для конкретных моделей (реальные официальные коды)
    modelPaintCodes: {
        'bmw_e34': [
            { name: 'Красный', value: '#cc0000', code: '308', fullName: 'Brilliant Red' }, // BMW Brilliant Red
            { name: 'Синий', value: '#0066cc', code: '276', fullName: 'Avus Blue Metallic' }, // BMW Avus Blue Metallic
            { name: 'Черный', value: '#000000', code: '668', fullName: 'Jet Black' }, // BMW Jet Black
            { name: 'Белый', value: '#ffffff', code: '300', fullName: 'Alpine White III' }, // BMW Alpine White III
            { name: 'Серебристый', value: '#c0c0c0', code: '309', fullName: 'Arctic Silver Metallic' }, // BMW Arctic Silver
            { name: 'Серый', value: '#808080', code: '237', fullName: 'Granite Silver Metallic' }, // BMW Granite Silver
            { name: 'Зеленый', value: '#2d5016', code: '205', fullName: 'Malachite Green Metallic' }, // BMW Malachite Green
            { name: 'Желтый', value: '#ffcc00', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Оранжевый', value: '#cc5500', code: '252', fullName: 'Calypso Red Metallic' }, // BMW Calypso Red (близкий к оранжевому)
            { name: 'Фиолетовый', value: '#6b3fa0', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Розовый', value: '#ff99cc', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Коричневый', value: '#8b6f47', code: '139', fullName: 'Bronzite Beige Metallic' } // BMW Bronzite Beige
        ],
        'bmw_m3_gtr': [
            { name: 'Красный', value: '#cc0000', code: '236', fullName: 'Misano Red' }, // BMW Misano Red (близкий к M3 GTR)
            { name: 'Синий', value: '#003366', code: 'N/A', fullName: 'Individual Racing Blue' }, // Специальный цвет для M3 GTR
            { name: 'Черный', value: '#000000', code: '668', fullName: 'Jet Black' }, // BMW Jet Black
            { name: 'Белый', value: '#ffffff', code: '300', fullName: 'Alpine White' }, // BMW Alpine White
            { name: 'Серебристый', value: '#c0c0c0', code: '309', fullName: 'Arctic Silver Metallic' }, // BMW Arctic Silver
            { name: 'Серый', value: '#808080', code: '229', fullName: 'Sebring Gray Metallic' }, // BMW Sebring Gray
            { name: 'Зеленый', value: '#2d5016', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Желтый', value: '#ffcc00', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Оранжевый', value: '#cc5500', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Фиолетовый', value: '#6b3fa0', code: 'N/A', fullName: 'Techno Violet' }, // BMW Techno Violet (для M3)
            { name: 'Розовый', value: '#ff99cc', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Коричневый', value: '#8b6f47', code: 'N/A', fullName: 'Individual' } // Не стандартный цвет
        ],
        'bmw_4_series_lbworks': [
            { name: 'Красный', value: '#cc0000', code: 'A75', fullName: 'Melbourne Red Metallic' }, // BMW Melbourne Red
            { name: 'Синий', value: '#0066cc', code: 'B45', fullName: 'Estoril Blue II' }, // BMW Estoril Blue II
            { name: 'Черный', value: '#000000', code: '475', fullName: 'Black Sapphire Metallic' }, // BMW Black Sapphire
            { name: 'Белый', value: '#ffffff', code: 'A96', fullName: 'Mineral White Metallic' }, // BMW Mineral White
            { name: 'Серебристый', value: '#c0c0c0', code: 'A83', fullName: 'Glacier Silver Metallic' }, // BMW Glacier Silver
            { name: 'Серый', value: '#808080', code: 'B39', fullName: 'Mineral Grey Metallic' }, // BMW Mineral Grey
            { name: 'Зеленый', value: '#2d5016', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Желтый', value: '#ffcc00', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Оранжевый', value: '#cc5500', code: 'B50', fullName: 'Valencia Orange Metallic' }, // BMW Valencia Orange
            { name: 'Фиолетовый', value: '#6b3fa0', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Розовый', value: '#ff99cc', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Коричневый', value: '#8b6f47', code: 'N/A', fullName: 'Individual' } // Не стандартный цвет
        ],
        'bmw_m440i': [
            { name: 'Красный', value: '#cc0000', code: 'C3N', fullName: 'Aventurin Red Metallic' }, // BMW Aventurin Red
            { name: 'Синий', value: '#0066cc', code: 'C31', fullName: 'Portimao Blue Metallic' }, // BMW Portimao Blue
            { name: 'Черный', value: '#000000', code: '475', fullName: 'Black Sapphire Metallic' }, // BMW Black Sapphire
            { name: 'Белый', value: '#ffffff', code: '300', fullName: 'Alpine White' }, // BMW Alpine White
            { name: 'Серебристый', value: '#c0c0c0', code: 'C36', fullName: 'Dravit Grey Metallic' }, // BMW Dravit Grey (близкий к серебристому)
            { name: 'Серый', value: '#808080', code: 'C4P', fullName: 'Brooklyn Grey Metallic' }, // BMW Brooklyn Grey
            { name: 'Зеленый', value: '#2d5016', code: 'C4G', fullName: 'San Remo Green Metallic' }, // BMW San Remo Green
            { name: 'Желтый', value: '#ffcc00', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Оранжевый', value: '#cc5500', code: 'C1X', fullName: 'Sunset Orange Metallic' }, // BMW Sunset Orange
            { name: 'Фиолетовый', value: '#6b3fa0', code: 'C3Z', fullName: 'Tanzanite Blue II Metallic' }, // BMW Tanzanite Blue (близкий к фиолетовому)
            { name: 'Розовый', value: '#ff99cc', code: 'N/A', fullName: 'Individual' }, // Не стандартный цвет
            { name: 'Коричневый', value: '#8b6f47', code: 'N/A', fullName: 'Individual' } // Не стандартный цвет
        ],
        'toyota_supra': [
            { name: 'Красный', value: '#cc0000', code: '3R3', fullName: 'Red Mica' }, // Toyota Red Mica
            { name: 'Синий', value: '#0066cc', code: '8P4', fullName: 'Blue Mica' }, // Toyota Blue Mica
            { name: 'Черный', value: '#000000', code: '202', fullName: 'Black' }, // Toyota Black
            { name: 'Белый', value: '#ffffff', code: '040', fullName: 'Super White' }, // Toyota Super White
            { name: 'Серебристый', value: '#c0c0c0', code: '1G3', fullName: 'Silver Metallic' }, // Toyota Silver Metallic
            { name: 'Серый', value: '#808080', code: '1G1', fullName: 'Grey Metallic' }, // Toyota Grey Metallic
            { name: 'Зеленый', value: '#2d5016', code: '6Q7', fullName: 'Green Mica' }, // Toyota Green Mica
            { name: 'Желтый', value: '#ffcc00', code: '4Y9', fullName: 'Yellow' }, // Toyota Yellow
            { name: 'Оранжевый', value: '#cc5500', code: '3R4', fullName: 'Orange Mica' }, // Toyota Orange Mica
            { name: 'Фиолетовый', value: '#6b3fa0', code: '8P5', fullName: 'Purple Mica' }, // Toyota Purple Mica
            { name: 'Розовый', value: '#ff99cc', code: 'N/A', fullName: 'Custom' }, // Не стандартный цвет
            { name: 'Коричневый', value: '#8b6f47', code: '4T9', fullName: 'Brown Mica' } // Toyota Brown Mica
        ]
    },
    rotationStep: Math.PI / 4,
    defaultColor: '#ff0000',
    // Список доступных моделей автомобилей
    carModels: [
        {
            id: 'bmw_e34',
            name: 'BMW E34',
            url: 'https://dommilife80-crypto.github.io/model/bmw_e34_stance_style.glb',
            scale: 1.0,
            position: { x: 0, y: 0, z: 0 }
        },
        {
            id: 'toyota_supra',
            name: 'Toyota Supra Veilside',
            url: 'https://dommilife80-crypto.github.io/model/2014_veilside_supra_fortune_03_body_kit_jza80.glb',
            scale: 1.0,
            position: { x: 0, y: 0, z: 0 }
        },
        {
            id: 'bmw_4_series_lbworks',
            name: 'BMW 4 Series LB Works',
            url: 'https://dommilife80-crypto.github.io/model/2014_lbworks_bmw_4_series_body_kit_f82.glb',
            scale: 1.0,
            position: { x: 0, y: 0, z: 0 }
        },
        {
            id: 'bmw_m440i',
            name: 'BMW M440i xDrive Gran Coupe',
            url: 'https://dommilife80-crypto.github.io/model/2022_bmw_m440i_xdrive_gran_coupe.glb',
            scale: 1.0,
            position: { x: 0, y: 0, z: 0 }
        },
        {
            id: 'bmw_m3_gtr',
            name: 'BMW M3 GTR (Need for Speed)',
            url: 'https://dommilife80-crypto.github.io/model/2005_bmw_m3_gtr_need_for_speed_most_wanted.glb',
            scale: 1.0,
            position: { x: 0, y: 0, z: 0 }
        }
    ],
    carModel: {
        // ============================================
        // НАСТРОЙКА МОДЕЛИ
        // ============================================
        // По умолчанию используется первая модель из списка
        // Можно изменить через интерфейс выбора модели
        // ============================================
        currentModelIndex: 0, // Индекс модели в списке carModels
        autoCenter: true, // Автоматически центрировать модель
        autoScale: true // Автоматически масштабировать для удобного просмотра
    },
    camera: {
        fov: 50,
        position: { x: 0, y: 1.5, z: 5 },
        near: 0.1,
        far: 1000
    },
    lighting: {
        ambient: { color: 0xffffff, intensity: 0.8 },
        directional: { color: 0xffffff, intensity: 1.0, position: { x: 5, y: 10, z: 5 } },
        point: { color: 0xffffff, intensity: 0.6, position: { x: -5, y: 5, z: -5 } }
    }
};

// ============================================
// Класс для управления 3D сценой
// ============================================
class CarViewer3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.car = null;
        this.carMaterials = [];
        this.rotationY = 0;
        this.rotationX = 0;
        this.currentColor = CONFIG.defaultColor;
        this.animationId = null;
        this.loader = null;
        this.isLoading = false;
        
        // Переменные для вращения мышью
        this.isDragging = false;
        this.lastMouseX = 0;
        this.lastMouseY = 0;
        this.rotationSpeed = 0.005; // Скорость вращения
        
        // Переменные для зума
        this.cameraDistance = 5; // Начальное расстояние камеры
        this.minDistance = 2; // Минимальное расстояние (максимальное приближение)
        this.maxDistance = 15; // Максимальное расстояние (максимальное отдаление)
        this.zoomSpeed = 0.1; // Скорость зума
        
        // Переменные для pinch zoom
        this.lastTouchDistance = 0;
        this.isZooming = false;
        
        this.init();
    }

    /**
     * Инициализация 3D сцены
     */
    init() {
        if (!this.container) {
            console.error('Контейнер не найден');
            return;
        }

        this.container.innerHTML = '';
        this.createScene();
        this.createCamera();
        this.createRenderer();
        this.createLights();
        this.createCar();
        this.setupEventListeners();
        this.animate();
    }

    /**
     * Создание сцены
     */
    createScene() {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf5f7fa);
    }

    /**
     * Создание камеры
     */
    createCamera() {
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(
            CONFIG.camera.fov,
            aspect,
            CONFIG.camera.near,
            CONFIG.camera.far
        );
        // Инициализируем начальное расстояние
        this.cameraDistance = Math.sqrt(
            Math.pow(CONFIG.camera.position.x, 2) +
            Math.pow(CONFIG.camera.position.y, 2) +
            Math.pow(CONFIG.camera.position.z, 2)
        );
        
        // Устанавливаем начальную позицию камеры
        this.updateCameraPosition();
    }

    /**
     * Создание рендерера
     */
    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.container.appendChild(this.renderer.domElement);
    }

    /**
     * Создание освещения
     */
    createLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(
            CONFIG.lighting.ambient.color,
            CONFIG.lighting.ambient.intensity
        );
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(
            CONFIG.lighting.directional.color,
            CONFIG.lighting.directional.intensity
        );
        directionalLight.position.set(
            CONFIG.lighting.directional.position.x,
            CONFIG.lighting.directional.position.y,
            CONFIG.lighting.directional.position.z
        );
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Point light
        const pointLight = new THREE.PointLight(
            CONFIG.lighting.point.color,
            CONFIG.lighting.point.intensity
        );
        pointLight.position.set(
            CONFIG.lighting.point.position.x,
            CONFIG.lighting.point.position.y,
            CONFIG.lighting.point.position.z
        );
        this.scene.add(pointLight);
    }

    /**
     * Загрузка модели автомобиля
     */
    async createCar() {
        if (this.isLoading) return;
        
        this.isLoading = true;
        const loadingElement = this.container.querySelector('.loading');
        if (loadingElement) {
            loadingElement.textContent = 'Загрузка модели автомобиля...';
        }

        try {
            // Загружаем модель из .glb файла
            const hasGLTFLoader = (typeof GLTFLoader !== 'undefined') || 
                                  (typeof window !== 'undefined' && window.GLTFLoader) ||
                                  (typeof THREE !== 'undefined' && THREE.GLTFLoader);
            
            if (!hasGLTFLoader) {
                throw new Error('GLTFLoader не найден. Убедитесь, что библиотека загружена.');
            }
            
            // Получаем текущую модель из списка
            const currentModel = this.getCurrentModel();
            if (!currentModel || !currentModel.url) {
                throw new Error('Модель не выбрана или путь к модели не указан');
            }
            
            await this.loadGLTFModel();
        } catch (error) {
            console.error('Ошибка загрузки модели:', error);
            const loadingElement = this.container.querySelector('.loading');
            if (loadingElement) {
                loadingElement.textContent = `Ошибка загрузки: ${error.message}`;
                loadingElement.style.color = '#ff0000';
            }
        } finally {
            this.isLoading = false;
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
        }
    }

    /**
     * Загрузка GLTF модели из Blender
     */
    /**
     * Получить текущую модель из списка
     */
    getCurrentModel() {
        const index = CONFIG.carModel.currentModelIndex || 0;
        if (index >= 0 && index < CONFIG.carModels.length) {
            return CONFIG.carModels[index];
        }
        return CONFIG.carModels[0] || null;
    }

    /**
     * Загрузить модель по индексу
     */
    async loadModelByIndex(index) {
        if (index >= 0 && index < CONFIG.carModels.length) {
            CONFIG.carModel.currentModelIndex = index;
            await this.createCar();
        }
    }

    async loadGLTFModel() {
        return new Promise((resolve, reject) => {
            // Получаем текущую модель
            const currentModel = this.getCurrentModel();
            if (!currentModel || !currentModel.url) {
                reject(new Error('Модель не выбрана или путь к модели не указан'));
                return;
            }

            const modelUrl = currentModel.url;

            console.log('Загрузка модели:', modelUrl);

            // Ждем немного, чтобы убедиться, что GLTFLoader загружен
            const tryCreateLoader = () => {
                const LoaderClass = window.GLTFLoader || 
                                   (typeof GLTFLoader !== 'undefined' ? GLTFLoader : null) ||
                                   (typeof THREE !== 'undefined' && THREE.GLTFLoader ? THREE.GLTFLoader : null);
                
                if (!LoaderClass) {
                    console.error('GLTFLoader не найден. Доступные объекты:', {
                        windowGLTFLoader: typeof window.GLTFLoader,
                        globalGLTFLoader: typeof GLTFLoader,
                        threeGLTFLoader: typeof THREE !== 'undefined' && typeof THREE.GLTFLoader
                    });
                    reject(new Error('GLTFLoader не найден. Убедитесь, что библиотека загружена.'));
                    return null;
                }
                
                console.log('GLTFLoader найден, создаем загрузчик');
                return new LoaderClass();
            };

            if (!this.loader) {
                this.loader = tryCreateLoader();
                if (!this.loader) {
                    return;
                }
            }

            const loadingElement = this.container.querySelector('.loading');
            
            this.loader.load(
                modelUrl,
                (gltf) => {
                    console.log('Модель успешно загружена:', gltf);
                    const model = gltf.scene;
                    
                    if (!model) {
                        reject(new Error('Сцена модели пуста'));
                        return;
                    }
                    
                    console.log('Дочерние объекты модели:', model.children.length);
                    
                    // Автоматическое центрирование и масштабирование
                    if (CONFIG.carModel.autoCenter || CONFIG.carModel.autoScale) {
                        const box = new THREE.Box3().setFromObject(model);
                        const center = box.getCenter(new THREE.Vector3());
                        const size = box.getSize(new THREE.Vector3());
                        
                        console.log('Размер модели:', size);
                        console.log('Центр модели:', center);
                        
                        if (CONFIG.carModel.autoCenter) {
                            // Центрируем модель
                            model.position.sub(center);
                            console.log('Модель отцентрована');
                        }
                        
                        if (CONFIG.carModel.autoScale) {
                            // Масштабируем модель для удобного просмотра
                            const maxDim = Math.max(size.x, size.y, size.z);
                            const scale = 3 / maxDim; // Размер примерно 3 единицы
                            const finalScale = scale * currentModel.scale;
                            model.scale.multiplyScalar(finalScale);
                            console.log('Модель масштабирована:', finalScale);
                        } else {
                            model.scale.multiplyScalar(currentModel.scale);
                        }
                    }
                    
                    // Применяем позицию из конфигурации модели
                    model.position.add(new THREE.Vector3(
                        currentModel.position.x,
                        currentModel.position.y,
                        currentModel.position.z
                    ));
                    
                    // Включение теней и сохранение материалов
                    this.carMaterials = [];
                    let meshCount = 0;
                    model.traverse((child) => {
                        if (child.isMesh) {
                            meshCount++;
                            child.castShadow = true;
                            child.receiveShadow = true;
                            
                            // Сохраняем материалы для изменения цвета
                            if (child.material) {
                                if (Array.isArray(child.material)) {
                                    this.carMaterials.push(...child.material);
                                } else {
                                    this.carMaterials.push(child.material);
                                }
                            }
                        }
                    });
                    
                    console.log('Найдено мешей:', meshCount);
                    console.log('Найдено материалов:', this.carMaterials.length);

                    // Удаляем старую модель, если есть
                    if (this.car) {
                        this.scene.remove(this.car);
                    }

                    this.car = model;
                    this.scene.add(this.car);
                    
                    console.log('Модель добавлена в сцену');
                    
                    // Обновляем цвет после загрузки
                    this.updateCarColor();
                    
                    if (loadingElement) {
                        loadingElement.textContent = 'Модель загружена!';
                        setTimeout(() => {
                            loadingElement.style.display = 'none';
                        }, 1000);
                    }
                    
                    resolve();
                },
                (progress) => {
                    if (loadingElement) {
                        if (progress.total > 0) {
                            const percent = (progress.loaded / progress.total * 100).toFixed(0);
                            loadingElement.textContent = `Загрузка модели... ${percent}%`;
                        } else {
                            loadingElement.textContent = `Загрузка модели... ${(progress.loaded / 1024).toFixed(0)} KB`;
                        }
                    }
                    console.log('Прогресс загрузки:', progress);
                },
                (error) => {
                    console.error('Ошибка загрузки модели:', error);
                    console.error('Детали ошибки:', {
                        message: error.message,
                        stack: error.stack,
                        modelUrl: modelUrl
                    });
                    if (loadingElement) {
                        loadingElement.textContent = `Ошибка загрузки: ${error.message || 'Неизвестная ошибка'}`;
                        loadingElement.style.color = '#ff0000';
                    }
                    reject(error);
                }
            );
        });
    }


    /**
     * Обновление цвета автомобиля
     */
    updateColor(color) {
        this.currentColor = color;
        this.updateCarColor();
    }

    /**
     * Обновление цвета материалов автомобиля
     */
    updateCarColor() {
        if (!this.car) return;

        const colorHex = parseInt(this.currentColor.replace('#', ''), 16);
        
        // Обновляем материалы кузова
        this.carMaterials.forEach(material => {
            if (material && material.color) {
                material.color.setHex(colorHex);
            }
        });

        // Если модель загружена из GLTF, обновляем все материалы кузова
        this.car.traverse((child) => {
            if (child.isMesh && child.material) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                materials.forEach(mat => {
                    // Пропускаем стекла, фары и другие элементы
                    if (mat && mat.name && 
                        !mat.name.toLowerCase().includes('glass') &&
                        !mat.name.toLowerCase().includes('window') &&
                        !mat.name.toLowerCase().includes('light') &&
                        !mat.name.toLowerCase().includes('wheel') &&
                        !mat.name.toLowerCase().includes('tire') &&
                        !mat.name.toLowerCase().includes('rim') &&
                        mat.color) {
                        mat.color.setHex(colorHex);
                    }
                });
            }
        });
    }

    /**
     * Вращение автомобиля (для кнопок)
     */
    rotate(direction) {
        if (direction === 'left') {
            this.rotationY += CONFIG.rotationStep; // Инвертировано для интуитивного управления
        } else if (direction === 'right') {
            this.rotationY -= CONFIG.rotationStep; // Инвертировано для интуитивного управления
        } else if (direction === 'reset') {
            this.rotationY = 0;
            this.rotationX = 0;
            // Сбрасываем зум к начальному значению
            this.cameraDistance = 5;
        }
        // Обновляем позицию камеры после изменения вращения
        this.updateCameraPosition();
    }

    /**
     * Вращение мышью
     */
    onMouseDown(event) {
        this.isDragging = true;
        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
        this.container.style.cursor = 'grabbing';
    }

    onMouseMove(event) {
        if (!this.isDragging) return;

        const deltaX = event.clientX - this.lastMouseX;
        const deltaY = event.clientY - this.lastMouseY;

        // Вращение по оси Y (горизонтально) - инвертируем для интуитивного управления
        this.rotationY -= deltaX * this.rotationSpeed;
        
        // Вращение по оси X (вертикально) с ограничением - инвертируем для интуитивного управления
        this.rotationX -= deltaY * this.rotationSpeed;
        // Ограничиваем вертикальное вращение
        this.rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotationX));

        // Обновляем позицию камеры после вращения
        this.updateCameraPosition();

        this.lastMouseX = event.clientX;
        this.lastMouseY = event.clientY;
    }

    onMouseUp(event) {
        this.isDragging = false;
        this.container.style.cursor = 'grab';
    }

    /**
     * Обработка touch событий для мобильных устройств
     */
    onTouchStart(event) {
        if (event.touches.length === 2) {
            // Два пальца - начинаем zoom
            this.onTouchStartZoom(event);
            return;
        }
        
        if (event.touches.length === 1) {
            this.isDragging = true;
            this.lastMouseX = event.touches[0].clientX;
            this.lastMouseY = event.touches[0].clientY;
            event.preventDefault();
        }
    }

    onTouchMove(event) {
        // Если два пальца - это zoom
        if (event.touches.length === 2) {
            this.onTouchMoveZoom(event);
            return;
        }
        
        if (!this.isDragging || event.touches.length !== 1) return;

        const deltaX = event.touches[0].clientX - this.lastMouseX;
        const deltaY = event.touches[0].clientY - this.lastMouseY;

        // Вращение по оси Y (горизонтально) - инвертируем для интуитивного управления
        this.rotationY -= deltaX * this.rotationSpeed;
        
        // Вращение по оси X (вертикально) с ограничением - инвертируем для интуитивного управления
        this.rotationX -= deltaY * this.rotationSpeed;
        this.rotationX = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, this.rotationX));

        // Обновляем позицию камеры после вращения
        this.updateCameraPosition();

        this.lastMouseX = event.touches[0].clientX;
        this.lastMouseY = event.touches[0].clientY;
        event.preventDefault();
    }

    onTouchEnd(event) {
        this.isDragging = false;
        this.isZooming = false;
        this.lastTouchDistance = 0;
    }

    /**
     * Обработка зума колесиком мыши
     */
    onWheel(event) {
        event.preventDefault();
        
        // Определяем направление прокрутки
        const delta = event.deltaY > 0 ? 1 : -1;
        
        // Изменяем расстояние камеры
        this.cameraDistance += delta * this.zoomSpeed;
        
        // Ограничиваем расстояние
        this.cameraDistance = Math.max(this.minDistance, Math.min(this.maxDistance, this.cameraDistance));
        
        // Обновляем позицию камеры
        this.updateCameraPosition();
    }

    /**
     * Обработка pinch zoom на тачпаде
     */
    onTouchStartZoom(event) {
        if (event.touches.length === 2) {
            this.isZooming = true;
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            this.lastTouchDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            event.preventDefault();
        }
    }

    onTouchMoveZoom(event) {
        if (event.touches.length === 2 && this.isZooming) {
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const currentDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            
            if (this.lastTouchDistance > 0) {
                const delta = (this.lastTouchDistance - currentDistance) * 0.01;
                this.cameraDistance += delta;
                this.cameraDistance = Math.max(this.minDistance, Math.min(this.maxDistance, this.cameraDistance));
                this.updateCameraPosition();
            }
            
            this.lastTouchDistance = currentDistance;
            event.preventDefault();
        }
    }

    /**
     * Обновление позиции камеры с учетом зума
     */
    updateCameraPosition() {
        if (!this.camera) return;
        
        // Вычисляем новую позицию камеры на сфере вокруг модели
        const x = Math.sin(this.rotationY) * Math.cos(this.rotationX) * this.cameraDistance;
        // Инвертируем знак для y, чтобы движение мыши вниз наклоняло модель вниз
        const y = -Math.sin(this.rotationX) * this.cameraDistance + CONFIG.camera.position.y;
        const z = Math.cos(this.rotationY) * Math.cos(this.rotationX) * this.cameraDistance;
        
        this.camera.position.set(x, y, z);
        this.camera.lookAt(0, 0, 0);
    }

    /**
     * Анимация
     */
    animate() {
        this.animationId = requestAnimationFrame(() => this.animate());

        if (this.car) {
            // Вращение модели (если нужно, можно отключить для орбитальной камеры)
            // this.car.rotation.y = this.rotationY;
            // this.car.rotation.x = this.rotationX;
        }

        this.renderer.render(this.scene, this.camera);
    }

    /**
     * Обработка изменения размера окна
     */
    handleResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    /**
     * Настройка обработчиков событий
     */
    setupEventListeners() {
        window.addEventListener('resize', () => this.handleResize());
        
        // Обработчики мыши для вращения модели
        if (this.container) {
            // Устанавливаем курсор
            this.container.style.cursor = 'grab';
            
            // События мыши
            this.container.addEventListener('mousedown', (e) => this.onMouseDown(e));
            document.addEventListener('mousemove', (e) => this.onMouseMove(e));
            document.addEventListener('mouseup', (e) => this.onMouseUp(e));
            
            // События зума колесиком мыши
            this.container.addEventListener('wheel', (e) => this.onWheel(e), { passive: false });
            
            // События touch для мобильных устройств
            this.container.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });
            this.container.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });
            this.container.addEventListener('touchend', (e) => this.onTouchEnd(e));
            this.container.addEventListener('touchcancel', (e) => this.onTouchEnd(e));
        }
    }

    /**
     * Очистка ресурсов
     */
    dispose() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// ============================================
// Класс для управления цветовой палитрой
// ============================================
class ColorPalette {
    constructor(containerId, onColorSelect) {
        this.container = document.getElementById(containerId);
        this.onColorSelect = onColorSelect;
        this.activeColorIndex = 0;
        
        this.createPalette();
    }

    /**
     * Отображение кода краски
     */
    displayPaintCode(code, fullName) {
        const codeDisplay = document.getElementById('paint-code-display');
        const codeValue = document.getElementById('paint-code-value');
        const codeName = document.getElementById('paint-code-name');
        
        if (codeDisplay && codeValue) {
            if (code && code !== 'N/A') {
                codeValue.textContent = code;
                codeDisplay.style.display = 'block';
                
                // Показываем полное название цвета, если есть
                if (codeName && fullName) {
                    codeName.textContent = fullName;
                } else if (codeName) {
                    codeName.textContent = '';
                }
            } else if (code === 'N/A') {
                codeValue.textContent = 'N/A';
                codeDisplay.style.display = 'block';
                if (codeName && fullName) {
                    codeName.textContent = fullName + ' (не стандартный цвет)';
                }
            } else {
                codeDisplay.style.display = 'none';
            }
        }
    }

    /**
     * Получить цвета для текущей модели
     */
    getColorsForCurrentModel() {
        const currentModel = CONFIG.carModels[CONFIG.carModel.currentModelIndex];
        if (currentModel && CONFIG.modelPaintCodes[currentModel.id]) {
            return CONFIG.modelPaintCodes[currentModel.id];
        }
        return CONFIG.presetColors;
    }

    /**
     * Создание палитры цветов
     */
    createPalette() {
        if (!this.container) {
            console.error('Контейнер палитры не найден');
            return;
        }

        // Очищаем контейнер
        this.container.innerHTML = '';

        // Получаем цвета для текущей модели
        const colors = this.getColorsForCurrentModel();

        colors.forEach((colorData, index) => {
            const colorDiv = document.createElement('div');
            colorDiv.className = 'color-option';
            if (index === 0) {
                colorDiv.classList.add('active');
            }
            colorDiv.style.backgroundColor = colorData.value;
            colorDiv.setAttribute('role', 'button');
            colorDiv.setAttribute('aria-label', `Выбрать цвет ${colorData.name}`);
            colorDiv.setAttribute('tabindex', '0');
            colorDiv.title = colorData.name;

            // Обработчик клика
            colorDiv.addEventListener('click', () => {
                this.selectColor(index, colorData.value, colorData.code, colorData.fullName);
            });

            // Обработчик клавиатуры
            colorDiv.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectColor(index, colorData.value, colorData.code, colorData.fullName);
                }
            });

            this.container.appendChild(colorDiv);
        });
    }

    /**
     * Выбор цвета
     */
    selectColor(index, colorValue, paintCode, fullName) {
        // Удаляем активный класс со всех элементов
        document.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });

        // Добавляем активный класс к выбранному элементу
        const colorOptions = this.container.querySelectorAll('.color-option');
        if (colorOptions[index]) {
            colorOptions[index].classList.add('active');
        }

        this.activeColorIndex = index;
        this.onColorSelect(colorValue, paintCode, fullName);
    }

    /**
     * Сброс активного состояния
     */
    resetActive() {
        document.querySelectorAll('.color-option').forEach(opt => {
            opt.classList.remove('active');
        });
    }
}

// ============================================
// Главный класс приложения
// ============================================
class CarPaintingApp {
    constructor() {
        this.carViewer = null;
        this.colorPalette = null;
        this.init();
    }

    /**
     * Инициализация приложения
     */
    init() {
        // Проверка наличия Three.js
        if (typeof THREE === 'undefined') {
            console.error('Three.js не загружен');
            return;
        }

        // Инициализация 3D просмотрщика
        this.carViewer = new CarViewer3D('car-container');

        // Инициализация цветовой палитры
        this.colorPalette = new ColorPalette('color-grid', (color, paintCode, fullName) => {
            this.handleColorChange(color, paintCode, fullName);
        });

        // Показываем код краски для первого цвета по умолчанию
        this.updatePaintCodeForCurrentModel();

        // Инициализация селектора моделей
        this.initModelSelector();

        // Настройка обработчиков событий
        this.setupEventHandlers();
    }

    /**
     * Инициализация селектора моделей
     */
    initModelSelector() {
        const selector = document.getElementById('model-selector');
        const title = document.getElementById('model-title');
        
        if (!selector) return;

        // Заполняем селектор опциями
        CONFIG.carModels.forEach((model, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = model.name;
            if (index === CONFIG.carModel.currentModelIndex) {
                option.selected = true;
            }
            selector.appendChild(option);
        });

        // Обновляем заголовок
        this.updateModelTitle();

        // Обработчик смены модели
        selector.addEventListener('change', (e) => {
            const selectedIndex = parseInt(e.target.value);
            this.changeModel(selectedIndex);
        });
    }

    /**
     * Обновление заголовка модели
     */
    updateModelTitle() {
        const title = document.getElementById('model-title');
        if (title && CONFIG.carModels.length > 0) {
            const currentModel = CONFIG.carModels[CONFIG.carModel.currentModelIndex];
            if (currentModel) {
                title.textContent = `3D Модель ${currentModel.name}`;
            }
        }
    }

    /**
     * Обновление кода краски для текущей модели
     */
    updatePaintCodeForCurrentModel() {
        if (this.colorPalette) {
            const colors = this.colorPalette.getColorsForCurrentModel();
            const firstColor = colors[0];
            if (firstColor && firstColor.code) {
                this.colorPalette.displayPaintCode(firstColor.code, firstColor.fullName);
            }
        }
    }

    /**
     * Смена модели
     */
    async changeModel(index) {
        if (index >= 0 && index < CONFIG.carModels.length && this.carViewer) {
            const loadingElement = document.querySelector('.loading');
            if (loadingElement) {
                loadingElement.style.display = 'block';
                loadingElement.textContent = 'Загрузка модели...';
            }

            try {
                // Сбрасываем вращение
                this.carViewer.rotationY = 0;
                this.carViewer.rotationX = 0;
                
                // Загружаем новую модель
                await this.carViewer.loadModelByIndex(index);
                
                // Обновляем заголовок
                this.updateModelTitle();
                
                // Обновляем палитру цветов для новой модели
                if (this.colorPalette) {
                    this.colorPalette.createPalette();
                    this.updatePaintCodeForCurrentModel();
                }
            } catch (error) {
                console.error('Ошибка загрузки модели:', error);
                if (loadingElement) {
                    loadingElement.textContent = `Ошибка загрузки: ${error.message}`;
                    loadingElement.style.color = '#ff0000';
                }
            }
        }
    }

    /**
     * Обработка изменения цвета
     */
    handleColorChange(color, paintCode, fullName) {
        if (this.carViewer) {
            this.carViewer.updateColor(color);
        }
        
        // Обновление кастомного цветового инпута
        const customColorInput = document.getElementById('custom-color');
        if (customColorInput) {
            customColorInput.value = color;
        }

        // Отображение кода краски
        if (this.colorPalette) {
            this.colorPalette.displayPaintCode(paintCode, fullName);
        }
    }

    /**
     * Настройка обработчиков событий
     */
    setupEventHandlers() {
        // Кастомный цветовой инпут
        const customColorInput = document.getElementById('custom-color');
        if (customColorInput) {
            customColorInput.addEventListener('input', (e) => {
                const color = e.target.value;
                this.handleColorChange(color, null, null); // Нет кода для пользовательского цвета
                if (this.colorPalette) {
                    this.colorPalette.resetActive();
                }
            });
        }

        // Кнопки вращения
        const rotateLeftBtn = document.getElementById('rotate-left');
        const rotateRightBtn = document.getElementById('rotate-right');
        const resetRotationBtn = document.getElementById('reset-rotation');

        if (rotateLeftBtn) {
            rotateLeftBtn.addEventListener('click', () => {
                if (this.carViewer) {
                    this.carViewer.rotate('left');
                }
            });
        }

        if (rotateRightBtn) {
            rotateRightBtn.addEventListener('click', () => {
                if (this.carViewer) {
                    this.carViewer.rotate('right');
                }
            });
        }

        if (resetRotationBtn) {
            resetRotationBtn.addEventListener('click', () => {
                if (this.carViewer) {
                    this.carViewer.rotate('reset');
                }
            });
        }
    }
}

// ============================================
// Инициализация приложения после загрузки DOM
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Проверка поддержки WebGL
    if (!window.WebGLRenderingContext) {
        const container = document.getElementById('car-container');
        if (container) {
            container.innerHTML = '<div class="loading" style="color: #ff0000;">Ваш браузер не поддерживает WebGL</div>';
        }
        return;
    }

    // Проверка: открыт ли файл через file:// протокол (только если используется локальная модель)
    // Если модель загружается с внешнего источника (GitHub Pages), эта проверка не нужна
    if (window.location.protocol === 'file:' && CONFIG.carModel.useLocalModel) {
        const container = document.getElementById('car-container');
        if (container) {
            const warning = document.createElement('div');
            warning.style.cssText = 'position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #fff3cd; border: 2px solid #ffc107; border-radius: 10px; padding: 20px; max-width: 500px; text-align: center; z-index: 1000;';
            warning.innerHTML = `
                <h3 style="color: #856404; margin-bottom: 10px;">⚠️ Требуется локальный сервер</h3>
                <p style="color: #856404; margin-bottom: 15px;">
                    Файл открыт напрямую. Для загрузки локальной модели нужен локальный веб-сервер.
                </p>
                <p style="color: #856404; font-size: 0.9em; margin-bottom: 10px;">
                    <strong>Быстрый способ:</strong><br>
                    Python: <code>python -m http.server 8000</code><br>
                    Затем откройте: <code>http://localhost:8000</code>
                </p>
                <p style="color: #856404; font-size: 0.85em;">
                    Или используйте внешнюю ссылку на модель в CONFIG.carModel.url
                </p>
            `;
            container.appendChild(warning);
        }
        console.warn('⚠️ Файл открыт через file:// протокол. Для локальной модели используйте локальный сервер.');
        return;
    }

    // Инициализация приложения
    window.carPaintingApp = new CarPaintingApp();
});

// Очистка при выгрузке страницы
window.addEventListener('beforeunload', () => {
    if (window.carPaintingApp && window.carPaintingApp.carViewer) {
        window.carPaintingApp.carViewer.dispose();
    }
});

