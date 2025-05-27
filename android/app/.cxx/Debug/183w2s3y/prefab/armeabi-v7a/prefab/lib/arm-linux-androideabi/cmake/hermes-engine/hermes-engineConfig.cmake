if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/dkdk/.gradle/caches/8.13/transforms/f448083111b7cd846b6fdfc7adbb3e45/transformed/hermes-android-0.79.2-debug/prefab/modules/libhermes/libs/android.armeabi-v7a/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/dkdk/.gradle/caches/8.13/transforms/f448083111b7cd846b6fdfc7adbb3e45/transformed/hermes-android-0.79.2-debug/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

